import React, { useState } from 'react'
import { Modal, Input, Button } from 'antd'
import { listPhunkyApe } from '../../contracts/contractUtil'
import { v4 as uuidv4 } from 'uuid'

const localDirectory = '/ipfs/'

const ListingModal = ({ nft, visible, dispatch, web3, delegate }) => {
  const imgLocation = localDirectory + nft.num + '.png'
  const [inputValue, setInputValue] = useState('')

  const handleListPayc = () => {
    dispatch({ type: 'SET_START_LISTING_STATUS' })
    const txn = {
      id: uuidv4(),
      nft: nft,
      type: 'LIST',
      displayEther: inputValue,
      isPending: true,
    }

    delegate.addTxn(txn)

    listPhunkyApe(
      nft,
      inputValue,
      parseInt(nft.id, 16),
      web3,
      () => {
        delegate.txnSuccess({ ...txn, isPending: false })
        dispatch({ type: 'UPDATE_LISTING_DATA_FOR_NFT' })
      },
      () => {
        // dispatch({ type: 'SET_GLOBAL_LOADING_STATUS', value: false })
        delegate.txnError({ ...txn, isPending: false })
      }
    )
  }

  return (
    <Modal
      title={`List For Sale`}
      visible={visible}
      onCancel={() =>
        dispatch({ type: 'SET_LISTING_MODAL_STATUS', value: false, nft: {} })
      }
      onOk={() => {}}
      okText="List"
      footer={[
        <Button
          onClick={() =>
            dispatch({
              type: 'SET_LISTING_MODAL_STATUS',
              value: false,
              nft: {},
            })
          }
        >
          Cancel
        </Button>,
        <Button onClick={handleListPayc} type="primary">
          List PAYC
        </Button>,
      ]}
    >
      <img
        alt="nft to list"
        src={imgLocation}
        style={{
          width: '250px',
          margin: 'auto',
          borderRadius: '10px',
          marginBottom: '15px',
        }}
      />
      <Input
        autoFocus
        placeholder="Listing Price (Ξ)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Modal>
  )
}

export default ListingModal
