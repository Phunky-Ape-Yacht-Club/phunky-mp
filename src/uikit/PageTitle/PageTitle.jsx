import React from 'react'
import styled from '@emotion/styled'

const PageTitle = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>
}

const StyledTitle = styled.h2`
  margin: 2rem 0;
  text-transform: uppercase;
  font-size: 1.6em;
  font-weight: 800;
  font-style: italic;
  line-height: 1.2;
  color: white;
`

export default PageTitle
