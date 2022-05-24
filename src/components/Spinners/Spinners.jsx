import styled from '@emotion/styled'
import { Image } from 'antd'

const spinners = '/assets/spinner.gif'

const Spinners = () => {
  return (
    <SpinnerContainer>
      <Image
        preview={false}
        src={spinners}
        fallback={spinners}
        alt={'global spinners'}
      />
    </SpinnerContainer>
  )
}

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`

export default Spinners
