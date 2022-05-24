import React from 'react'
import styled from '@emotion/styled'

//TODO Implement trait rarity
const TraitBox = ({ label, value, chance }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Value>
        <span>{value}</span>
      </Value>
      {/*<Chance>{chance}</Chance>*/}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  border: 1px solid #bfc500;
  border-radius: 8px;
  width: 149px;
  margin: 5px;
  padding: 10px;
`

const Label = styled.div`
  text-align: center;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #bfc500;
`
const Value = styled.div`
  text-align: center;
  padding-top: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  //font-size: ;
`
// const Chance = styled.div``

export default TraitBox
