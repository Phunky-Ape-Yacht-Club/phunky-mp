import React, { useEffect, useState, useReducer } from 'react'
import { Modal, Input, Alert, Spin, Button } from 'antd'
import { useSubgraphData } from '../../hooks/useSubgraphData'
import styled from '@emotion/styled'

import CommonContainer from '../../uikit/CommonContainer/CommonContainer'
import Header from '../Header/Header'
import PageTitle from '../../uikit/PageTitle/PageTitle'
import { PillGroup, Pill } from '../../uikit/Pills/Pills'
import NFTCard from '../NFTCard/NFTCard'
import { reducer, getInitialState } from './MyCollectionReducer'
import { Flex } from '../../uikit/Flex/Flex'
import ListingModal from '../Modals/ListingModal'
import MyCurrentListingModal from '../Modals/MyCurrentListingModal'
import OffersReceivedModal from '../Modals/OffersReceivedModal'
import MyOffersModal from '../Modals/MyOffersModal'
import Spinners from '../Spinners/Spinners'

function MyCollection({ web3, delegate }) {
  const { fetchMyCollection, fetchMyOffers } = useSubgraphData()
  const [state, dispatch] = useReducer(reducer, getInitialState())

  // Toggle collection view
  const onViewChange = (view) => {
    dispatch({ type: 'SET_COLLECTION_VIEW', value: view })
  }

  const getEmptyStateMsg = () => {
    if (state.selectedView === 'my_payc') {
      return 'GO BUY SOME PAYC'
    } else if (state.selectedView === 'my_listing') {
      return 'GO SELL SOME PAYC'
    } else if (state.selectedView === 'offers_received') {
      return 'NO OFFERS RECEIVED'
    } else if (state.selectedView === 'offers_made') {
      return 'NO OFFERS MADE'
    }
  }

  const getModalDispatchByViewContext = (nft) => {
    // case for when to open listing modal
    if (state.selectedView === 'my_payc' && !nft.isForSale) {
      return dispatch({
        type: 'SET_LISTING_MODAL_STATUS',
        value: true,
        nft: nft,
      })
    } else if (state.selectedView === 'my_listing') {
      return dispatch({
        type: 'SET_MY_LISTING_MODAL_STATUS',
        value: true,
        nft: nft,
      })
    } else if (state.selectedView === 'offers_received') {
      return dispatch({
        type: 'SET_OFFERS_RECEIVED_MODAL_STATUS',
        value: true,
        nft: nft,
      })
    } else if (state.selectedView === 'offers_made') {
      return dispatch({
        type: 'SET_MY_OFFERS_MADE_MODAL_STATUS',
        value: true,
        nft: nft,
      })
    }
    return () => {}
  }

  useEffect(() => {
    const userAddress = window.ethereum.selectedAddress
    fetchMyCollection(userAddress).then((collection) => {
      dispatch({ type: 'SET_GRAPH_DATA', value: collection })
    })
    fetchMyOffers(userAddress).then((bids) => {
      dispatch({ type: 'SET_MY_OFFER_DATA', value: bids })
    })
  }, [])

  console.log('offerMade', state)

  return (
    <>
      {state.isGlobalLoadingStatus ? <Spinners /> : null}
      <CommonContainer>
        <Header delegate={delegate} />
        <PageHeaderContainer>
          <PageTitle title="My Collection" />
          <Flex container align="center" justify="space-between">
            <PillGroup>
              <Pill
                active={state.selectedView === 'my_payc'}
                text="My PAYC"
                onClick={() => onViewChange('my_payc')}
              />
              <Pill
                active={state.selectedView === 'my_listing'}
                text="My Listing"
                onClick={() => onViewChange('my_listing')}
              />
              <Pill
                active={state.selectedView === 'offers_received'}
                text="Offers Received"
                onClick={() => onViewChange('offers_received')}
              />
              <Pill
                active={state.selectedView === 'offers_made'}
                text="Offers Made"
                onClick={() => onViewChange('offers_made')}
              />
            </PillGroup>
          </Flex>
        </PageHeaderContainer>
        <CollectionContainer>
          <CollectionGrid>
            {state.dataSource.map((nft, index) => (
              <NFTCard
                key={index}
                nft={nft}
                web3={web3}
                dispatch={dispatch}
                onClick={() => getModalDispatchByViewContext(nft)}
                disableBuyButton={true}
                enableMyOffer={state.selectedView === 'offers_made'}
              />
            ))}
          </CollectionGrid>
        </CollectionContainer>
        {state.dataSource.length <= 0 && (
          <Container>{getEmptyStateMsg()}</Container>
        )}
        <ListingModal
          nft={state.selectedNft}
          visible={state.isListingModalOpen}
          dispatch={dispatch}
          web3={web3}
          delegate={delegate}
        />
        <MyCurrentListingModal
          nft={state.selectedNft}
          web3={web3}
          visible={state.isMyListingModalOpen}
          dispatch={dispatch}
          delegate={delegate}
        />
        <OffersReceivedModal
          nft={state.selectedNft}
          visible={state.isOffersReceivedModalOpen}
          dispatch={dispatch}
          web3={web3}
          delegate={delegate}
        />
        <MyOffersModal
          nft={state.selectedNft}
          visible={state.isMyOffersMdatModalOpen}
          dispatch={dispatch}
          delegate={delegate}
        />
      </CommonContainer>
    </>
  )
}

const mobileWidth = 700

const PageHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr;
  grid-gap: 1rem;

  h1 {
    color: white;
    margin: 0 20px;
  }
  @media (max-width: ${mobileWidth}px) {
    display: flex;
    flex-direction: column;
  }
`

const CollectionContainer = styled.div`
  display: flex;

  @media (max-width: ${mobileWidth}px) {
    padding-top: 2rem;
  }
`

const CollectionGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`
const Container = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default MyCollection
