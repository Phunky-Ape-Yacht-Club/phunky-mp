import { useNativeBalance } from 'hooks/useNativeBalance'
import { n4 } from 'helpers/formatters'
import styled from '@emotion/styled'

function NativeBalance(props) {
  const { balance, nativeName } = useNativeBalance(props)

  if (!balance) return

  return <Balance>{`${n4.format(balance.formatted)} ${nativeName}`}</Balance>
}

const Balance = styled.div`
  margin: 10px;
  padding: 8px;
  white-space: nowrap;
`

export default NativeBalance
