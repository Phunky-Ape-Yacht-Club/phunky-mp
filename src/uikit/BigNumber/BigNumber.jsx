import React from 'react'
import styled from '@emotion/styled'

const BigNumber = ({ value, color }) => (
  <StyledNumber color={color}>{value || ''}</StyledNumber>
)

const StyledNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${(p) => p.color || 'white'};
`
export default BigNumber
