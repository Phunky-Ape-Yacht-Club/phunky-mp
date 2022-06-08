import { getEllipsisTxt } from 'helpers/formatters'
import Blockie from '../Blockie/Blockie'
import { Button, Card, Modal } from 'antd'
import Address from '../Address/Address'
import { SelectOutlined } from '@ant-design/icons'
import { getExplorer } from 'helpers/networks'
import styled from '@emotion/styled'
import { PrimaryButton, SecondaryButton } from '../../uikit/Buttons/Buttons'
import { withdraw } from 'contracts/contractUtil'
import { cryptoPhunksMarketAbi } from 'contracts/abi/cryptoPhunksMarketABI'
import { phunkyApeYachtClub721Abi } from 'contracts/abi/phunkyApeYachtClub721ABI'
import { useEffect, useState } from 'react'
import { paycMarketPlaceContractAddr } from 'consts'

function AccountButton({ web3 }) {
  const walletAddress = window.ethereum
    ? window.ethereum.selectedAddress
    : 'N/A'

  const [withdrawAmt, updateWithdrawAmt] = useState('')

  useEffect(async () => {
    const contract = new web3.eth.Contract(
      cryptoPhunksMarketAbi,
      paycMarketPlaceContractAddr
    )
    const amt = await contract.methods
      .pendingWithdrawals(window.ethereum.selectedAddress)
      .call()
    updateWithdrawAmt(web3.utils.fromWei(amt, 'ether') + ' ≡')
  }, [])
  return (
    <AccountContainer>
      <PrimaryButton
        onClick={() => {}}
        text={walletAddress == 'N/A' ? 'N/A' : getEllipsisTxt(walletAddress, 4)}
      ></PrimaryButton>
      <SecondaryButton
        text={`🚰 ${withdrawAmt}`}
        onClick={async () => await withdraw(web3)}
      ></SecondaryButton>
    </AccountContainer>
  )
}

const AccountContainer = styled.div`
  display: flex;
  width: 100%;
`

export default AccountButton
