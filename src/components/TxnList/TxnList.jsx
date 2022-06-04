import React from 'react'
import styled from '@emotion/styled'
import { faStaylinked } from '@fortawesome/free-brands-svg-icons'
import { Image } from 'antd'
import { localDirectory } from 'consts'

const spinners = '/assets/small_spiner.svg'
const x = '/assets/x.svg'
const trash = '/assets/trash.svg'

const TxnList = ({ delegate }) => {
  console.log(delegate)
  return (
    <>
      <TxnButton
        onClick={delegate.toggleTxnContainer}
        onBlur={delegate.toggleTxnContainer}
      >
        TXNs
      </TxnButton>
      {delegate.txnsState.isTxnListOpen ? (
        <TxnAnchor>
          <TxnContainer>
            <TxnHeaderContainer>
              <TxnHeader>TXN List</TxnHeader>
              <X>
                <Image
                  onClick={delegate.toggleTxnContainer}
                  width={13}
                  preview={false}
                  src={x}
                  fallback={x}
                />
              </X>
            </TxnHeaderContainer>
            <Line />
            {delegate.txnsState.txns.length === 0 ? (
              <TxnEmptyState>No TXNs</TxnEmptyState>
            ) : (
              <Txns>
                {delegate.txnsState.txns.map((txn, idx) => {
                  if (txn.type === 'LIST') {
                    return (
                      <>
                        <Txn>
                          <TxnRow>
                            <Image
                              width={30}
                              preview={false}
                              src={localDirectory + txn.nft.num + '.png'}
                            />
                          </TxnRow>
                          <TxnRow>LIST</TxnRow>
                          <TxnRow>PAYC #{txn.nft.num}</TxnRow>
                          {txn.isPending ? (
                            <Image
                              width={30}
                              preview={false}
                              src={spinners}
                              fallback={spinners}
                              alt={'spinners'}
                            />
                          ) : (
                            <X>
                              <Image
                                onClick={() => delegate.removeTxn(txn)}
                                width={13}
                                preview={false}
                                src={trash}
                                fallback={trash}
                                alt={'spinners'}
                              />
                            </X>
                          )}
                        </Txn>
                        {delegate.txnsState.txns.length !== idx ? (
                          <Line />
                        ) : null}
                      </>
                    )
                  }
                })}
              </Txns>
            )}
          </TxnContainer>
        </TxnAnchor>
      ) : null}
    </>
  )
}

const TxnButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 55px;
  padding: 0px 7px;
  background-color: #bfc500;
  border-radius: 5px;
  margin-left: 10px;
  font-weight: bolder;
  cursor: pointer;
  color: black;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`
const TxnAnchor = styled.div`
  height: 0px;
  width: 0px;
`

const TxnHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const X = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`

const Line = styled.div`
  border: 0.5px solid;
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
`

const Txn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 5px 5px;
`

const TxnHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  font-weight: bolder;
`

const TxnRow = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 0px;
  border-top: 0px;
  border-bottom: 0px;
  margin-right: 5px;
  height: 100%;
`

const TxnEmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  height: 100%;
`

const Txns = styled.div`
  font-weight: 600;
  height: 100%;
  width: 100%;
`

const TxnContainer = styled.div`
  position: absolute;
  background-color: #bfc500;
  width: 250px;
  border-radius: 5px;
  border: 1px solid black;
  color: black;
  top: 100px;
  right: 35px;
  z-index: 999;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`

export default TxnList
