import React from 'react'
import { Modal } from 'antd'
import styled from '@emotion/styled'
import PageTitle from '../../uikit/PageTitle/PageTitle'
import { PrimaryButton, SecondaryButton } from '../../uikit/Buttons/Buttons'

const NFTModal = ({ nft, visible, setVisibility, children }) => {
  // console.log('nft', nft)

  const renderTitle = () => (
    <ModalTitle>{`${nft.name || ''} / ${nft.token_id || ''}`}</ModalTitle>
  )

  const renderFooter = () => (
    <ModalFooter>
      <CancelButton>
        <SecondaryButton text="cancel" />
      </CancelButton>
      <TransactionButtons>
        <PrimaryButton text="Make Offer" />
        <PrimaryButton text="Buy Now" />
      </TransactionButtons>
    </ModalFooter>
  )

  if (nft)
    return (
      <Modal
        centered
        width="70vw"
        // title={renderTitle()}
        closable={false}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => setVisibility(false)}
        footer={renderFooter()}
      >
        {children}
      </Modal>
    )
  return null
}

const ModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`

const ModalFooter = styled.div`
  background: black;
  padding: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
`

const CancelButton = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const TransactionButtons = styled.div`
  display: grid;
  grid-gap: 1rem;
  //grid-template-columns: 1fr 1fr;
`

const StyledInput = styled.input``

export default NFTModal
