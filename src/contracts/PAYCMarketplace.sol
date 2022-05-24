pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PAYCMarketplace is ReentrancyGuard, Pausable, Ownable {
    IERC721 paycContract;

    struct Offer {
        bool isForSale;
        uint paycIndex;
        address seller;
        uint minValue; // in ether
        address onlySellTo;
    }

    struct Bid {
        bool hasBid;
        uint paycIndex;
        address bidder;
        uint value;
    }

    // A record of PAYC that are offered for sale at a specific minimum value, and perhaps to a specific person
    mapping (uint => Offer) public paycOfferedForSale;

    // indexes represent token IDs and each index stores a boolean
    bool[10000] public paycOnSaleStatus;

    // A record of the highest bid
    mapping (uint => Bid) public paycBids;

    // A record of pending ETH withdrawals by address
    mapping (address => uint) public pendingWithdrawals;

    event PaycOffered(uint indexed paycIndex, uint minValue, address indexed toAddress);
    event PaycBidEntered(uint indexed paycIndex, uint value, address indexed fromAddress);
    event PaycBidWithdrawn(uint indexed paycIndex, uint value, address indexed fromAddress);
    event PaycBought(uint indexed paycIndex, uint value, address indexed fromAddress, address indexed toAddress);
    event PaycNoLongerForSale(uint indexed paycIndex);

    /* Initializes contract with an instance of PAYC contract, and sets deployer as owner */
    constructor(address initialPaycAddress) {
        IERC721(initialPaycAddress).balanceOf(address(this));
        paycContract = IERC721(initialPaycAddress);
    }

    function pause() public whenNotPaused onlyOwner {
        _pause();
    }

    function unpause() public whenPaused onlyOwner {
        _unpause();
    }

    /* Returns the PAYC contract address currently being used */
    function paycAddress() public view returns (address) {
        return address(paycContract);
    }

    /* Allows the owner of the contract to set a new PAYC contract address */
    function setPaycContract(address newPaycAddress) public onlyOwner {
        paycContract = IERC721(newPaycAddress);
    }

    /* Allows the owner of a PAYC to stop offering it for sale */
    function paycNoLongerForSale(uint paycIndex) public nonReentrant() {
        if (paycIndex >= 10000) revert('token index not valid');
        if (paycContract.ownerOf(paycIndex) != msg.sender) revert('you are not the owner of this token');
        paycOnSaleStatus[paycIndex] = false;
        paycOfferedForSale[paycIndex] = Offer(false, paycIndex, msg.sender, 0, address(0x0));
        emit PaycNoLongerForSale(paycIndex);
    }

    /* Allows a PAYC owner to offer it for sale */
    function offerPaycForSale(uint paycIndex, uint minSalePriceInWei) public whenNotPaused nonReentrant()  {
        if (paycIndex >= 10000) revert('token index not valid');
        if (paycContract.ownerOf(paycIndex) != msg.sender) revert('you are not the owner of this token');
        paycOnSaleStatus[paycIndex] = true;
        paycOfferedForSale[paycIndex] = Offer(true, paycIndex, msg.sender, minSalePriceInWei, address(0x0));
        emit PaycOffered(paycIndex, minSalePriceInWei, address(0x0));
    }

    /* Allows a PAYC owner to offer it for sale to a specific address */
    function offerPaycForSaleToAddress(uint paycIndex, uint minSalePriceInWei, address toAddress) public whenNotPaused nonReentrant() {
        if (paycIndex >= 10000) revert();
        if (paycContract.ownerOf(paycIndex) != msg.sender) revert('you are not the owner of this token');
        paycOnSaleStatus[paycIndex] = true;
        paycOfferedForSale[paycIndex] = Offer(true, paycIndex, msg.sender, minSalePriceInWei, toAddress);
        emit PaycOffered(paycIndex, minSalePriceInWei, toAddress);
    }

    /* Allows users to buy a PAYC offered for sale */
    function buyPayc(uint paycIndex) payable public whenNotPaused nonReentrant() {
        if (paycIndex >= 10000) revert('token index not valid');
        Offer memory offer = paycOfferedForSale[paycIndex];
        if (!offer.isForSale) revert('payc is not for sale'); // payc not actually for sale
        if (offer.onlySellTo != address(0x0) && offer.onlySellTo != msg.sender) revert();
        if (msg.value != offer.minValue) revert('not enough ether');          // Didn't send enough ETH
        address seller = offer.seller;
        if (seller == msg.sender) revert('seller == msg.sender');
        if (seller != paycContract.ownerOf(paycIndex)) revert('seller no longer owner of payc'); // Seller no longer owner of payc


        paycOfferedForSale[paycIndex] = Offer(false, paycIndex, msg.sender, 0, address(0x0));
        paycContract.safeTransferFrom(seller, msg.sender, paycIndex);
        pendingWithdrawals[seller] += msg.value;
        paycOnSaleStatus[paycIndex] = false;
        emit PaycBought(paycIndex, msg.value, seller, msg.sender);

        // Check for the case where there is a bid from the new owner and refund it.
        // Any other bid can stay in place.
        Bid memory bid = paycBids[paycIndex];
        if (bid.bidder == msg.sender) {
            // Kill bid and refund value
            pendingWithdrawals[msg.sender] += bid.value;
            paycBids[paycIndex] = Bid(false, paycIndex, address(0x0), 0);
        }
    }

    /* Allows users to retrieve ETH from sales */
    function withdraw() public nonReentrant() {
        uint amount = pendingWithdrawals[msg.sender];
        // Remember to zero the pending refund before
        // sending to prevent re-entrancy attacks
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    /* Allows users to enter bids for any PAYC */
    function enterBidForPayc(uint paycIndex) payable public whenNotPaused nonReentrant() {
        if (paycIndex >= 10000) revert('token index not valid');
        if (paycContract.ownerOf(paycIndex) == msg.sender) revert('you already own this payc');
        if (msg.value == 0) revert('cannot enter bid of zero');
        Bid memory existing = paycBids[paycIndex];
        if (msg.value <= existing.value) revert('your bid is too low');
        if (existing.value > 0) {
            // Refund the failing bid
            pendingWithdrawals[existing.bidder] += existing.value;
        }
        paycBids[paycIndex] = Bid(true, paycIndex, msg.sender, msg.value);
        emit PaycBidEntered(paycIndex, msg.value, msg.sender);
    }

    /* Allows PAYC owners to accept bids for their PAYC */
    function acceptBidForPayc(uint paycIndex, uint minPrice) public whenNotPaused nonReentrant() {
        if (paycIndex >= 10000) revert('token index not valid');
        if (paycContract.ownerOf(paycIndex) != msg.sender) revert('you do not own this token');
        address seller = msg.sender;
        Bid memory bid = paycBids[paycIndex];
        if (bid.value == 0) revert('cannot enter bid of zero');
        if (bid.value < minPrice) revert('your bid is too low');

        address bidder = bid.bidder;
        if (seller == bidder) revert('you already own this token');
        paycOfferedForSale[paycIndex] = Offer(false, paycIndex, bidder, 0, address(0x0));
        uint amount = bid.value;
        paycBids[paycIndex] = Bid(false, paycIndex, address(0x0), 0);
        paycContract.safeTransferFrom(msg.sender, bidder, paycIndex);
        paycOnSaleStatus[paycIndex] = false;
        pendingWithdrawals[seller] += amount;
        emit PaycBought(paycIndex, bid.value, seller, bidder);
    }

    /* Allows bidders to withdraw their bids */
    function withdrawBidForPayc(uint paycIndex) public nonReentrant() {
        if (paycIndex >= 10000) revert('token index not valid');
        Bid memory bid = paycBids[paycIndex];
        if (bid.bidder != msg.sender) revert('the bidder is not message sender');
        emit PaycBidWithdrawn(paycIndex, bid.value, msg.sender);
        uint amount = bid.value;
        paycBids[paycIndex] = Bid(false, paycIndex, address(0x0), 0);
        // Refund the bid money
        payable(msg.sender).transfer(amount);
    }

    /* Check if PAYC is on sale */
    function isPaycOnSale(uint paycIndex) public view returns(bool) {
        if (paycIndex >= 10000) revert('token index not valid');
        return paycOnSaleStatus[paycIndex];
    }

    /* Get list of bools on all PAYC sale statuses */
    function getPaycOnSaleStatus() public view returns(bool[10000] memory) {
        return paycOnSaleStatus;
    }
}
