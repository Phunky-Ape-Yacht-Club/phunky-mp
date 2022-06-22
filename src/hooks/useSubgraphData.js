import { useEffect, useState } from 'react'
import { paycSubGraphAPI } from '../consts'

export const useSubgraphData = (web3) => {
  const [subgraphData, setSubgraphData] = useState({})

  const fetchSubgraphData = async () => {
    const result = await fetch(paycSubGraphAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          phunkyApes(where: {isForSale: true}) {
            id
            isForSale
            minValue
            currentOwner
            phunkyApeBids{
              id
              bidAmount
              from
            }
          }
          bids {
            bidAmount
            phunkyApe {
              id
              isForSale
              minValue
              currentOwner
            }
          }
      }`,
      }),
    })
    const jsonData = await result.json()
    return jsonData
  }

  const fetchSubgraphByHexId = async (hexId) => {
    const result = await fetch(paycSubGraphAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          phunkyApes(first: 1, where: {id: "${hexId}"}) {
            id
            isForSale
            minValue
            currentOwner,
            blockNumberListedForSale,
            phunkyApeTransfers {
              id
              blockNumber
              salePrice
              isSale
              from
              to
            }
            phunkyApeBids(orderBy: bidAmount, orderDirection: desc) {
              id
              bidAmount
              from
            }
          }
        }`,
      }),
    })
    const jsonData = await result.json()
    return jsonData
  }

  const fetchMyCollection = async (ownerAddress) => {
    const result = await fetch(paycSubGraphAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          phunkyApes(where: {currentOwner: "${ownerAddress}"}) {
            id
            isForSale
            minValue
            currentOwner
            phunkyApeBids {
              id
              bidAmount
              from
            }
          }
        }`,
      }),
    })
    const jsonData = await result.json()
    return jsonData
  }

  const fetchMyOffers = async (ownerAddress) => {
    const result = await fetch(paycSubGraphAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          bids(where: {from: "${ownerAddress}"}) {
            bidAmount
            from
            phunkyApe {
              id
              isForSale
              minValue
              currentOwner
            }
          }
        }`,
      }),
    })
    const jsonData = await result.json()
    return jsonData
  }

  useEffect(async () => {
    const data = await fetchSubgraphData()
    setSubgraphData(data)
  }, [])

  return {
    subgraphData,
    fetchSubgraphData,
    fetchSubgraphByHexId,
    fetchMyCollection,
    fetchMyOffers,
  }
}
