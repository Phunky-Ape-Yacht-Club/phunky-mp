import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

import AccountButton from '../AccountButton/AccountButton'
import { Dropdown, Image } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'

const Header = ({ delegate }) => {
  const menu = () => (
    <NavMenu>
      <NavLink to="/marketplace">Marketplace</NavLink>
      <NavLink to="/collection">My Collection</NavLink>
      <NavLink to="/faq">FAQ</NavLink>
    </NavMenu>
  )

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
      <HeaderActions>
        {window.innerWidth > 700 && (
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['nftMarket']}
          >
            <NavLink to="/marketplace">Marketplace</NavLink>
            <NavLink to="/collection">My Collection</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </Menu>
        )}

        {window.innerWidth <= 700 && (
          <Dropdown overlay={menu} trigger={['click']}>
            <div>🐵</div>
          </Dropdown>
        )}

        <AccountContainer>
          <AccountButton />
        </AccountContainer>
      </HeaderActions>
    </AppHeader>
  )
}

const AppHeader = styled.header`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
`
const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color: #bfc500;
  a {
    color: #000;
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

export default Header
