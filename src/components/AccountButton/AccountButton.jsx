import { getEllipsisTxt } from 'helpers/formatters'
import Blockie from '../Blockie/Blockie'
import { Button, Card, Modal } from 'antd'
import { useState } from 'react'
import Address from '../Address/Address'
import { SelectOutlined } from '@ant-design/icons'
import { getExplorer } from 'helpers/networks'
import styled from '@emotion/styled'
import { PrimaryButton } from '../../uikit/Buttons/Buttons'

function AccountButton() {
  const walletAddress = window.ethereum
    ? window.ethereum.selectedAddress
    : 'N/A'

  return (
    <AccountContainer>
      <PrimaryButton
        onClick={() => {}}
        text={walletAddress == 'N/A' ? 'N/A' : getEllipsisTxt(walletAddress, 4)}
      ></PrimaryButton>
    </AccountContainer>
  )
}

const AccountContainer = styled.div`
  display: flex;
  width: 100%;
`

export default AccountButton
