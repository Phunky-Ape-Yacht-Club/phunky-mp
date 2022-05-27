import React, { useState, useReducer, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useSubgraphData } from '../../hooks/useSubgraphData'
import { reducer, getInitialState } from './MarketplaceReducer'
import styled from '@emotion/styled'

import Filter from './Filter'
import CommonContainer from '../../uikit/CommonContainer/CommonContainer'
import Header from '../Header/Header'
import PageTitle from '../../uikit/PageTitle/PageTitle'
import NFTCard from '../NFTCard/NFTCard'
import Spinners from '../Spinners/Spinners'
import ConfettiContainer from '../ConfettiContainer/ConfettiContainer'
import NFTLoadingCards from '../NFTLoadingCards/NFTLoadingCards'
import { PillGroup, Pill } from '../../uikit/Pills/Pills'
import SortDropdown from '../../uikit/SortDropdown/SortDropdown'
import { Flex } from '../../uikit/Flex/Flex'

function Marketplace({ web3, delegate }) {
  // example: logged to console the mock subgraph data on rinkeby
  const marketDataHook = useSubgraphData()
  // Filter Region
  const [state, dispatch] = useReducer(reducer, getInitialState())
  // Filter Region End
  // Forwarding to token details
  const history = useHistory()
  const goToNFT = (tokenId) => {
    history.push(`/details/${tokenId}`)
  }

  // Toggle market view
  const onViewChange = (view) => {
    dispatch({ type: 'SET_VIEW', value: view })
  }

  // Used to trigger loading states.
  useEffect(() => {
    if (state.isFuseQueryLoading) {
      dispatch({ type: 'SET_FUSE_DATA' })
    }
  }, [state.isFuseQueryLoading])

  useEffect(() => {
    dispatch({ type: 'SET_FUSE_QUERY_LOADING', value: false })
  }, [state.galleryData])

  // Sorting
  const [selectedSort, setSelectedSort] = useState('price_asc')
  useEffect(() => {}, [selectedSort])

  console.log(state.galleryData)
  // Set subgraph data to reducer
  useEffect(() => {
    if (marketDataHook.subgraphData.data) {
      dispatch({
        type: 'SET_SUBGRAPH_DATA',
        value: marketDataHook.subgraphData,
      })
    }
  }, [marketDataHook.subgraphData])

  return (
    <>
      {state.isPlayingConfetti ? (
        <ConfettiContainer dispatch={dispatch} />
      ) : null}
      {state.isGlobalLoadingStatus ? <Spinners /> : null}
      <CommonContainer>
        <Header delegate={delegate} />
        <PageHeaderContainer>
          <PageTitle title="Marketplace" />
          <Flex container align="center" justify="space-between">
            <PillGroup>
              <Pill
                active={state.selectedView === 'for_sale'}
                text="For Sale"
                onClick={() => onViewChange('for_sale')}
              />
              <Pill
                active={state.selectedView === 'has_bids'}
                text="Has Bids"
                onClick={() => onViewChange('has_bids')}
              />
              <Pill
                active={state.selectedView === 'view_all'}
                text="View All (limit 300)"
                onClick={() => onViewChange('view_all')}
              />
            </PillGroup>
            <Flex>
              <SortDropdown
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
              />
            </Flex>
          </Flex>
        </PageHeaderContainer>
        <MarketPlaceContainer>
          <Filter state={state} dispatch={dispatch} />
          <GridContainer>
            {state.isFuseQueryLoading ? (
              <NFTLoadingCards />
            ) : (
              state.galleryData
                ?.slice(0, 200)
                .map((ape, index) => (
                  <NFTCard
                    nft={ape.item}
                    key={index}
                    web3={web3}
                    dispatch={dispatch}
                    onClick={() => goToNFT(ape.item.num)}
                  />
                ))
            )}
          </GridContainer>
        </MarketPlaceContainer>
      </CommonContainer>
    </>
  )
}

const PageHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr;
  grid-gap: 1rem;

  h1 {
    color: white;
    margin: 0 20px;
  }
`

const MarketPlaceContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 3fr 9fr;
  padding-bottom: 2rem;
`

const GridContainer = styled.div`
  display: grid;
  grid-gap: 1.4rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto 1fr;
  height: calc(100vh - 208px);
  overflow-y: scroll;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`

export default Marketplace
