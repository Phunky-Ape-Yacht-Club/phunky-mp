import React from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

const ConfettiContainer = ({ dispatch, isLocal, onComplete }) => {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={700}
      gravity={0.3}
      tweenDuration={20000}
      recycle={false}
      onConfettiComplete={(confetti) => {
        if (isLocal) {
          onComplete()
        } else {
          dispatch({ type: 'TURN_CONFETTI_OFF' })
        }
        confetti.reset()
      }}
    />
  )
}

export default ConfettiContainer
