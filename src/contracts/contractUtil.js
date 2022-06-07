import { cryptoPhunksMarketAbi } from './abi/cryptoPhunksMarketABI'
import { phunkyApeYachtClub721Abi } from './abi/phunkyApeYachtClub721ABI'
import {
  paycMarketPlaceContractAddr,
  paycSubGraphAPI,
  payc721ContractAddr,
} from '../consts'
import BN from 'bn.js'

// TODO there is probably a lot of refactoring / drying up we can do on this files

export async function buyPhunkyApe(
  nft,
  phunkyApeId,
  web3,
  onSuccess,
  onError,
  isIdHex
) {
  const waitForReceipt = (hash, cb) => {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        console.log('err occured')
        console.log(err)
      }

      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt)
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb)
        }, 1000)
      }
    })
  }

  const contract = new web3.eth.Contract(
    cryptoPhunksMarketAbi,
    paycMarketPlaceContractAddr
  )

  // Input phunkyApeId into this field.
  const abi_byte_string = await contract.methods
    .buyPayc(phunkyApeId)
    .encodeABI()

  const buyPrice = new BN(nft.minValue) // Ape price demoninated in wei.
  const amountInWei = buyPrice.toString()

  const txObject = {
    from: window.ethereum.selectedAddress,
    to: paycMarketPlaceContractAddr,
    data: abi_byte_string,
    value: web3.utils.toHex(amountInWei),
  }

  try {
    const tx_hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    })

    await web3.eth.getTransactionReceipt(tx_hash, async (error, receipt) => {
      waitForReceipt(tx_hash, async (receipt) => {
        onSuccess(nft)
      })
    })
  } catch (error) {
    onError(nft)
  }
}

export async function bidOnPhunkyApe(
  nft,
  bidAmountInEther,
  phunkyApeId,
  web3,
  onSuccess,
  onError,
  isIdHex
) {
  const waitForReceipt = (hash, cb) => {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        console.log('err occured')
        console.log(err)
      }

      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt)
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb)
        }, 1000)
      }
    })
  }

  const contract = new web3.eth.Contract(
    cryptoPhunksMarketAbi,
    paycMarketPlaceContractAddr
  )

  // Input phunkyApeId into this field.
  const abi_byte_string = await contract.methods
    .enterBidForPayc(phunkyApeId)
    .encodeABI()

  const bidPrice = new BN(web3.utils.toWei(bidAmountInEther, 'ether')) // Ape price demoninated in wei.
  const amountInWei = bidPrice.toString()

  const txObject = {
    from: window.ethereum.selectedAddress,
    to: paycMarketPlaceContractAddr,
    data: abi_byte_string,
    value: web3.utils.toHex(amountInWei),
  }

  try {
    const tx_hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    })

    await web3.eth.getTransactionReceipt(tx_hash, async (error, receipt) => {
      waitForReceipt(tx_hash, async (receipt) => {
        onSuccess(nft)
      })
    })
  } catch (error) {
    onError(nft)
  }
}

export async function listPhunkyApe(
  nft,
  listAmountInEther,
  phunkyApeId,
  web3,
  onSuccess,
  onError
) {
  const waitForReceipt = (hash, cb) => {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        console.log('err occured')
        console.log(err)
      }

      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt)
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb)
        }, 1000)
      }
    })
  }

  const contract = new web3.eth.Contract(
    cryptoPhunksMarketAbi,
    paycMarketPlaceContractAddr
  )

  const paycContract = new web3.eth.Contract(
    phunkyApeYachtClub721Abi,
    payc721ContractAddr
  )

  const isApproved = await paycContract.methods
    .isApprovedForAll(
      window.ethereum.selectedAddress,
      paycMarketPlaceContractAddr
    )
    .call()

  if (!isApproved) {
    const abi_byte_str_approved = await paycContract.methods
      .setApprovalForAll(paycMarketPlaceContractAddr, true)
      .encodeABI()

    const approveTx = {
      from: window.ethereum.selectedAddress,
      to: payc721ContractAddr,
      data: abi_byte_str_approved,
      value: web3.utils.toHex(0),
    }

    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [approveTx],
    })
  }

  const listPrice = new BN(web3.utils.toWei(listAmountInEther, 'ether')) // Ape price demoninated in wei.
  const amountInWei = listPrice.toString()
  // Input phunkyApeId into this field.
  const abi_byte_string = await contract.methods
    .offerPaycForSale(phunkyApeId, amountInWei)
    .encodeABI()

  const txObject = {
    from: window.ethereum.selectedAddress,
    to: paycMarketPlaceContractAddr,
    data: abi_byte_string,
    value: web3.utils.toHex(0),
  }

  try {
    const tx_hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    })

    await web3.eth.getTransactionReceipt(tx_hash, async (error, receipt) => {
      waitForReceipt(tx_hash, async (receipt) => {
        onSuccess(nft)
      })
    })
  } catch (error) {
    onError(nft)
  }
}

export async function delistPhunkyApe(
  nft,
  phunkyApeId,
  web3,
  onSuccess,
  onError
) {
  const waitForReceipt = (hash, cb) => {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        console.log('err occured')
        console.log(err)
      }

      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt)
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb)
        }, 1000)
      }
    })
  }

  const contract = new web3.eth.Contract(
    cryptoPhunksMarketAbi,
    paycMarketPlaceContractAddr
  )

  // Input phunkyApeId into this field.
  const abi_byte_string = await contract.methods
    .paycNoLongerForSale(phunkyApeId)
    .encodeABI()

  const txObject = {
    from: window.ethereum.selectedAddress,
    to: paycMarketPlaceContractAddr,
    data: abi_byte_string,
    value: web3.utils.toHex(0),
  }

  try {
    const tx_hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    })

    await web3.eth.getTransactionReceipt(tx_hash, async (error, receipt) => {
      waitForReceipt(tx_hash, async (receipt) => {
        onSuccess(nft)
      })
    })
  } catch (error) {
    onError(nft)
  }
}

export async function acceptBid(
  nft,
  acceptAmountInEther,
  phunkyApeId,
  web3,
  onSuccess,
  onError
) {
  console.log('phunky id', phunkyApeId)
  const waitForReceipt = (hash, cb) => {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        console.log('err occured')
        console.log(err)
      }

      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt)
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb)
        }, 1000)
      }
    })
  }

  const contract = new web3.eth.Contract(
    cryptoPhunksMarketAbi,
    paycMarketPlaceContractAddr
  )

  const acceptPrice = new BN(web3.utils.toWei(acceptAmountInEther, 'ether')) // Ape price demoninated in wei.
  const amountInWei = acceptPrice.toString()
  // Input phunkyApeId into this field.
  const abi_byte_string = await contract.methods
    .acceptBidForPayc(phunkyApeId, amountInWei)
    .encodeABI()

  const txObject = {
    from: window.ethereum.selectedAddress,
    to: paycMarketPlaceContractAddr,
    data: abi_byte_string,
    value: web3.utils.toHex(0),
  }

  try {
    const tx_hash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    })

    await web3.eth.getTransactionReceipt(tx_hash, async (error, receipt) => {
      waitForReceipt(tx_hash, async (receipt) => {
        onSuccess(nft)
      })
    })
  } catch (error) {
    onError(nft)
  }
}
