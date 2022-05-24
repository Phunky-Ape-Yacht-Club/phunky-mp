import Blockies from 'react-blockies'
import styled from '@emotion/styled'

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props) {
  const walletAddress = window.ethereum.selectedAddress
  if ((!props.address && !props.currentWallet) || !walletAddress) return null

  return (
    <RoundBlockie
      seed={
        props.currentWallet
          ? walletAddress.toLowerCase()
          : props.address.toLowerCase()
      }
      {...props}
    />
  )
}

const RoundBlockie = styled(Blockies)`
  border-radius: 50%;
`

export default Blockie
