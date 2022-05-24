import { useEffect, useState } from 'react'
import { cryptoPhunksMarketAbi } from '../contracts/abi/cryptoPhunksMarketABI'
import { paycMarketPlaceContractAddr, paycSubGraphAPI } from '../consts'

export const useGetPaycOnSale = (web3) => {
  const [paycOnSaleStatus, updatePaycOnSaleStatus] = useState([])

  const fetchPaycOnSaleStatus = async () => {
    const contract = new web3.eth.Contract(
      cryptoPhunksMarketAbi,
      paycMarketPlaceContractAddr
    )
    const statuses = await contract.methods.getPaycOnSaleStatus().call()
    return statuses
  }

  useEffect(async () => {
    const paycOnSaleStatus = await fetchPaycOnSaleStatus()
    console.log(paycOnSaleStatus)
    updatePaycOnSaleStatus(paycOnSaleStatus)
  }, [])

  return { paycOnSaleStatus, fetchPaycOnSaleStatus }
}
