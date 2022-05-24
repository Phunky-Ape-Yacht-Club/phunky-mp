import React from 'react'
import styled from '@emotion/styled'

const CommonContainer = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
`

export default CommonContainer
