import React from 'react'
import styled from '@emotion/styled'
import { Image } from 'antd'
import fallbackImg from 'helpers/fallbackImg'
import { buyPhunkyApe } from '../../contracts/contractUtil'
import BN from 'bn.js'

const localDirectory = '/ipfs/'
const spinners = '/assets/spinner.gif'

const NFTCard = ({
  nft,
  onClick,
  isLoading,
  web3,
  dispatch,
  disableBuyButton = false,
  enableMyOffer = false,
}) => {
  const imgLocation = localDirectory + nft.num + '.png'
  // min value comes in wei so we need to convert it into a Big Number and then to ETH for
  // display but keep the wei value for when we make the transctions to the contracts
  if (!nft.minValue) {
    nft.minValue = '69420'
  }
  const price = new BN(nft.minValue)
  const ethPrice = web3 !== undefined ? web3.utils.fromWei(price, 'ether') : ''

  let bidEthPrice = ''
  if (nft.bidAmount) {
    const bid = new BN(nft.bidAmount)
    bidEthPrice = web3.utils.fromWei(bid, 'ether')
  }

  const handlePhunkyApeBuy = () => {
    dispatch({ type: 'SET_GLOBAL_LOADING_STATUS', value: true })
    buyPhunkyApe(
      nft,
      nft.phunkyApeId,
      web3,
      () => {
        dispatch({ type: 'REMOVE_APE_FROM_LISTING_DB', value: nft.num })
      },
      () => {
        dispatch({ type: 'SET_GLOBAL_LOADING_STATUS', value: false })
      },
      false
    )
  }

  return (
    <Card>
      <Clickable onClick={onClick}>
        <Image
          preview={false}
          src={isLoading ? spinners : imgLocation || 'error'}
          fallback={fallbackImg}
          alt={isLoading ? 'spinners' : nft.name}
          style={{ borderRadius: '12px' }}
        />
      </Clickable>
      <CardInfo>
        <CardTitle>PAYC #{isLoading ? '0000' : nft.num}</CardTitle>
        {nft.isForSale ? (
          <CardPrice>
            {isLoading ? '69420' : ethPrice} Ξ
            {!disableBuyButton ?? (
              <BuyNow onClick={handlePhunkyApeBuy}>Buy Now</BuyNow>
            )}
          </CardPrice>
        ) : null}
        {enableMyOffer ? (
          <CardPrice>My Offer {isLoading ? '69420' : bidEthPrice} Ξ</CardPrice>
        ) : null}
      </CardInfo>
    </Card>
  )
}

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #4c4c4c;
  border-radius: 12px;
`
const Clickable = styled.div`
  cursor: pointer;
`
const CardInfo = styled.div`
  padding: 0 0.5rem 0.5rem;
`

const CardTitle = styled.div`
  color: lightslategray;
`

const CardPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`

const BuyNow = styled.div`
  color: cornflowerblue;
  cursor: pointer;
  font-size: 0.9rem;
`

export default NFTCard
