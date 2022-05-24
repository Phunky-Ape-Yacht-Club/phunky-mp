import React from 'react'
import styled from '@emotion/styled'

import CommonContainer from '../../uikit/CommonContainer/CommonContainer'
import Header from '../Header/Header'
import PageTitle from '../../uikit/PageTitle/PageTitle'

const FAQ = () => {
  return (
    <CommonContainer>
      <Header />
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
