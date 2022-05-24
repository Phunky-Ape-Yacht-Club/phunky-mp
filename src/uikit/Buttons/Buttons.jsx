import React from 'react'
import styled from '@emotion/styled'

export const PrimaryButton = ({ onClick, text, children, fat = false }) => (
  <StyledButtonPrimary fat={fat} onClick={onClick}>
    {text}
    <div style={{ width: '.5rem' }} />
    {children}
  </StyledButtonPrimary>
)

const StyledButtonPrimary = styled.button`
  background-color: #bfc500;
  color: #000;
  border: 1px solid #bfc500;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  padding: ${(p) => (p.fat ? '16px' : '8px 16px')};
  margin: auto auto;
  transition: 0.3s;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  :hover {
    background: white;
    border-color: white;
  }
`

export const SecondaryButton = ({ onClick, text, children, fat = false }) => (
  <StyledButtonSecondary fat={fat} onClick={onClick}>
    {text}
    <div style={{ width: '.5rem' }} />
    {children}
  </StyledButtonSecondary>
)

const StyledButtonSecondary = styled.button`
  background-color: black;
  color: #bfc500;
  border: 1px solid #bfc500;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  padding: ${(p) => (p.fat ? '16px' : '8px 16px')};
  margin: auto auto;
  transition: 0.3s;
  width: 100%;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;

  :hover {
    background: white;
    color: black;
  }
`

export default PrimaryButton
