import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

import AccountButton from '../AccountButton/AccountButton'
import { Image } from 'antd'

const Header = ({ delegate }) => {
  return (
    <AppHeader>
      <StyledNavLink to="/">
        <Image
          preview={false}
          src="https://ik.imagekit.io/nldjkvbypwl/notYugalabs_2Wup2mc_Diw.png?updatedAt=1640903602465"
          alt=""
          style={{ width: '100px', height: 'auto' }}
        />
      </StyledNavLink>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['nftMarket']}>
        <NavLink to="/marketplace">Marketplace</NavLink>
        <NavLink to="/collection">My Collection</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
      </Menu>
      <AccountContainer>
        <AccountButton />
      </AccountContainer>
    </AppHeader>
  )
}

const AppHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 8fr 2fr;
  padding-top: 1rem;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Menu = styled.menu`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    color: #fff;
    font-size: 8px;
    font-style: italic;
    font-weight: 500;
    letter-spacing: 1.2px;
    caret-color: transparent;
    text-align: end;
    transition: 0.15s;
    text-transform: uppercase;
    margin: 10px;
    padding: 8px;

    :hover {
      color: #bfc500;
    }
  }
`

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 1rem;
`
export default Header
