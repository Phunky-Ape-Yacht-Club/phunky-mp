import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useSubgraphData } from '../../hooks/useSubgraphData'
import styled from '@emotion/styled'
import { Image, Input, Modal } from 'antd'

import Header from 'components/Header/Header'
import CommonContainer from 'uikit/CommonContainer/CommonContainer'
import BigNumber from 'uikit/BigNumber/BigNumber'
import TraitBox from 'uikit/TraitBox/TraitBox'
import { getEllipsisTxt } from 'helpers/formatters'
import { Flex } from '../../uikit/Flex/Flex'
import PrimaryButton, { SecondaryButton } from '../../uikit/Buttons/Buttons'
import fallbackImg from 'helpers/fallbackImg'
import { getApeByID } from '../../db'

import { buyPhunkyApe, bidOnPhunkyApe } from '../../contracts/contractUtil'
import Spinners from '../Spinners/Spinners'
import ConfettiContainer from '../ConfettiContainer/ConfettiContainer'

import BN from 'bn.js'

const NFTDetails = ({ web3 }) => {
  const { fetchSubgraphByHexId } = useSubgraphData()
  const { id } = useParams()
  const [listing, setListing] = useState({})
  const [txnHistory, setTxnHistory] = useState([])
  const [currentOwner, setCurrentOwner] = useState('')
  const [displayHighestBid, setDisplayHighestBid] = useState('')
  const [displayPrice, setDisplayPrice] = useState('')
  const [isPlayingConfetti, setIsPlayingConfetti] = useState(false)
  const [isGlobalLoadingStatus, setIsGlobalLoadingStatus] = useState(false)
  const [bidValue, setBidValue] = useState()

  const [token, setToken] = useState(null)

  console.log(token)
  // TODO
  useEffect(() => {
    const ape = getApeByID(id)
    ape.image = `https://payc-images.s3.amazonaws.com/ipfs/${ape.num}.png`
    console.log(ape.image)
    setToken(ape)
  }, [id, token])

  const onSuccessBuy = (nft) => {
    setIsGlobalLoadingStatus(false)
    setIsPlayingConfetti(true)

    // Optimistically Update Sale Price and isListing
    const clone = { ...listing, isForSale: false }
    setListing(clone)
  }

  const onSuccessBid = (nft) => {
    setIsGlobalLoadingStatus(false)
    setDisplayHighestBid(bidValue)
    // TODO optimistically update details state with bid placed
  }

  const onError = (nft) => {
    setIsGlobalLoadingStatus(false)
  }

  const purchaseNFT = () => {
    setIsGlobalLoadingStatus(true)
    buyPhunkyApe(listing, parseInt(listing.id, 16), web3, onSuccessBuy, onError)
  }

  const onCompleteConfetti = () => {
    setIsPlayingConfetti(false)
  }

  const bidOnNFT = (e) => {
    setShowBidModal(false)
    setIsGlobalLoadingStatus(true)
    if (!listing.id) {
      listing.id = id
    }

    bidOnPhunkyApe(
      listing,
      bidValue,
      parseInt(listing.id, 16),
      web3,
      onSuccessBid,
      onError
    )
  }

  const [showBidModal, setShowBidModal] = useState(false)

  const history = useHistory()
  useEffect(() => {
    if (web3) {
      fetchSubgraphByHexId(web3.utils.toHex(id)).then((nft) => {
        const listing =
          nft.data.phunkyApes.length > 0 ? nft.data.phunkyApes[0] : {}
        if (listing.isForSale) {
          const price = new BN(listing.minValue)
          const ethPrice = web3.utils.fromWei(price, 'ether')
          setListing(listing)
          setDisplayPrice(ethPrice)
        }

        setTxnHistory(nft.data.phunkyApes[0].phunkyApeTransfers)
        setCurrentOwner(listing.currentOwner)
        if (listing.phunkyApeBids.length > 0) {
          let highestOffer = 0
          for (let i = 0; i < listing.phunkyApeBids.length; i++) {
            highestOffer = Math.max(
              highestOffer,
              listing.phunkyApeBids[i].bidAmount
            )
          }
          try {
            const price = new BN(highestOffer)
            const ethPrice = web3.utils.fromWei(price, 'ether')
            setDisplayHighestBid(ethPrice)
          } catch {
            // TODO handle edge case when BN fails
          }
        }
      })
    }
  }, [])

  return (
    <CommonContainer>
      {isPlayingConfetti ? (
        <ConfettiContainer
          dispatch={{}}
          isLocal={true}
          onComplete={onCompleteConfetti}
        />
      ) : null}
      {isGlobalLoadingStatus ? <Spinners /> : null}
      <Header />
      <NFTDetailsContainer>
        <Flex>
          <Image
            title={`${token?.name} / ${token?.token_id}`}
            alt="nft to buy"
            src={token?.image || 'error'}
            fallback={fallbackImg}
            preview={false}
          />
          <Flex padding="2rem 0">
            <Label>Traits</Label>
            <TraitsContainer>
              {token?.attributes?.map((trait, i) => (
                <TraitBox
                  key={i}
                  label={trait.trait_type}
                  value={trait.value}
                />
              ))}
            </TraitsContainer>
          </Flex>
        </Flex>
        <InfoContainer>
          <Flex container align="center">
            <LinkHeader onClick={() => history.push('/marketplace')}>
              Phunky Ape Yacht Club
            </LinkHeader>
            <h2>{`/ #${token?.num}`}</h2>
          </Flex>
          <Flex padding="16px 0">
            <Label>
              Owned by: <a>{getEllipsisTxt(currentOwner, 4)}</a>
            </Label>
          </Flex>
          <Label>Price</Label>
          <PriceContainer>
            <Flex container justify="space-between" padding="1rem">
              {listing.isForSale ? (
                <Flex>
                  <Label>On Sale for</Label>
                  <BigNumber value={`${displayPrice} Ξ`} />
                </Flex>
              ) : null}
              {displayHighestBid !== '' ? (
                <Flex container direction="column" align="flex-end">
                  <Label>Highest Offer</Label>
                  <BigNumber value={`${displayHighestBid} Ξ`} />
                </Flex>
              ) : null}
            </Flex>
            <TransactionButtons>
              {listing.isForSale ? (
                <PrimaryButton text="Buy Now" onClick={() => purchaseNFT()} />
              ) : null}
              <SecondaryButton
                text="Offer"
                onClick={() => setShowBidModal(true)}
              />
            </TransactionButtons>
          </PriceContainer>
          <Flex padding="2rem 0">
            <Label>Transaction History</Label>
            <TransactionsContainer>
              {txnHistory
                ? txnHistory.map((el) => (
                    <li>
                      {typeof el.salePrice == 'string' ? (
                        <b>SALE</b>
                      ) : (
                        <b>TRANSFER</b>
                      )}
                      : {getEllipsisTxt(el.from, 4)} to:{' '}
                      {getEllipsisTxt(el.to, 4)}{' '}
                      {typeof el.salePrice == 'string'
                        ? 'for ' +
                          web3.utils.fromWei(el.salePrice, 'ether') +
                          'Ξ'
                        : ''}
                    </li>
                  ))
                : 'No transaction history'}
            </TransactionsContainer>
          </Flex>
        </InfoContainer>
      </NFTDetailsContainer>

      <Modal
        width="400px"
        title={`Bidding on PhunkyApeYachtClub #${token?.num}`}
        visible={showBidModal}
        onCancel={() => setShowBidModal(false)}
        onOk={bidOnNFT}
        okText="submit"
        cancelText="cancel"
        closable={false}
        centered
      >
        <Label>Offer Amount (Ξ)</Label>
        <Input
          type="number"
          value={bidValue}
          onChange={(event) => setBidValue(event.target.value)}
        />
      </Modal>
    </CommonContainer>
  )
}

const NFTDetailsContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 5fr 6fr;
  padding: 3rem 0;
`

const TraitsContainer = styled.div`
  display: flex;
  border: 1px solid #4c4c4c;
  border-radius: 8px;
  flex-wrap: wrap;
  padding: 10px;
`

const LinkHeader = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: #bfc500;
  cursor: pointer;
  padding-right: 0.5rem;
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #4c4c4c;
  border-radius: 8px;
`

const TransactionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  padding: 4rem 0;
  padding-left: 30px;
  border: 1px solid #4c4c4c;
  border-radius: 8px;
`

const TransactionButtons = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #4c4c4c;
  padding: 1rem;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  font-size: 1rem;
  color: lightslategray;
  font-weight: 500;
  margin-bottom: 0.5rem;

  a {
    font-weight: 400;
  }
`

export default NFTDetails
