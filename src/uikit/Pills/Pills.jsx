import React from 'react'
import styled from '@emotion/styled'
import { Flex } from '../Flex/Flex'

export const Pill = ({ active, text, onClick, icon }) => (
  <PillContainer onClick={onClick} active={active}>
    {icon && <Flex margin="0 .5rem 0 0">{icon}</Flex>}
    {text}
  </PillContainer>
)

const mobileWidth = 700

const PillContainer = styled.button`
  background: ${(p) => (p.active ? '#bfc500' : 'black')};
  border: 1px solid #bfc500;
  border-radius: 2rem;
  color: ${(p) => (p.active ? 'black' : '#bfc500')} !important;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  width: 100%;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${mobileWidth}px) {
    padding: 4px 8px;
  }
`

export const PillGroup = ({ children }) => {
  return <GroupContainer columns={children.length}>{children}</GroupContainer>
}

const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.columns}, 1fr);
  grid-gap: 1rem;
`
