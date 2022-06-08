import React, { useState, useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import './style.css'
import styled from '@emotion/styled'
import { useSubgraphData } from './hooks/useSubgraphData'

import { getCollection } from './helpers/collections'
import LandingPage from './components/LandingPage/LandingPage'
import Marketplace from './components/Marketplace/Marketplace'
import MyCollection from 'components/MyCollection/MyCollection'
import NFTDetails from './components/NFTDetails/NFTDetails'
import FAQ from './components/FAQ/FAQ'
import ScrollToTop from './helpers/scrollToTop'
import { reducer, getInitialState } from './reducer'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const App = ({ web3 }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState())

  // TODO move this shit out to a util
  const addTxn = (txn) => {
    dispatch({ type: 'ADD_TXN', value: txn })
  }

  const txnError = (txn) => {
    dispatch({ type: 'ERROR_TXN', value: txn })
  }

  const txnSuccess = (txn) => {
    dispatch({ type: 'SUCCESS_TXN', value: txn })
  }

  const removeTxn = (txn) => {
    dispatch({ type: 'REMOVE_TXN', value: txn })
  }

  const toggleTxnContainer = () => {
    dispatch({ type: 'TOGGLE_TXN_LIST' })
  }

  const delegate = {
    txnsState: state,
    addTxn,
    txnError,
    txnSuccess,
    removeTxn,
    toggleTxnContainer,
  }

  return (
    <Layout>
      <Router>
        <ScrollToTop>
          <Container>
            <Switch>
              <Route path="/" component={LandingPage} exact={true} />
              <Route path="/marketplace">
                <Marketplace web3={web3} delegate={delegate} />
              </Route>
              <Route path="/collection">
                <MyCollection web3={web3} delegate={delegate} />
              </Route>
              <Route path="/faq" component={FAQ} web3={web3} />
              <Route path="/details/:id">
                <NFTDetails web3={web3} />
              </Route>
              {/*<Route path="/Transactions">*/}
              {/*  <NFTMarketTransactions />*/}
              {/*</Route>*/}
            </Switch>
          </Container>
        </ScrollToTop>
      </Router>
      <Footer />
    </Layout>
  )
}

const Layout = styled.div`
  height: 100vh;
  overflow: auto;
  background-color: black;
  color: white;
`

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  display: block;
  min-height: 100%;
`

const Footer = styled.footer`
  height: 15px;
  background: #bfc500;
`

export default App
