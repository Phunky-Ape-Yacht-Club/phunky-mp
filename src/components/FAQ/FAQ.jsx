import React from 'react'
import styled from '@emotion/styled'

import CommonContainer from '../../uikit/CommonContainer/CommonContainer'
import Header from '../Header/Header'
import PageTitle from '../../uikit/PageTitle/PageTitle'
import Web3 from 'web3'

const FAQ = () => {
  const web3 = new Web3(
    'https://eth-mainnet.alchemyapi.io/v2/FoyJ5k74vjxe1Wgn6vRgYMQikX-QhdML'
  )
  return (
    <CommonContainer>
      <Header web3={web3} />
      <PageTitle title="FAQ" />
      <Container>SOON™</Container>
    </CommonContainer>
  )
}

const Container = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default FAQ
