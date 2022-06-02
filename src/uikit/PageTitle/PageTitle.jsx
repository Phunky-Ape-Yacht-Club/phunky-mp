import React from 'react'
import styled from '@emotion/styled'

const PageTitle = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>
}

const mobileWidth = 700

const StyledTitle = styled.h2`
  margin: 2rem 0;
  text-transform: uppercase;
  font-size: 1.6em;
  font-weight: 800;
  font-style: italic;
  line-height: 1.2;
  color: white;

  @media (max-width: ${mobileWidth}px) {
    margin: 0;
  }
`

export default PageTitle
