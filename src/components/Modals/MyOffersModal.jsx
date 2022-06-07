import { Modal, Input, Spin, Button } from 'antd'
import { localDirectory } from 'consts'

const MyOffersModal = ({ nft, visible, dispatch, delegate }) => {
  const imgLocation = localDirectory + nft.num + '.png'
  return (
    <Modal
      title={`My Offer`}
      visible={visible}
      onCancel={() =>
        dispatch({
          type: 'SET_MY_OFFERS_MADE_MODAL_STATUS',
          value: false,
          nft: {},
        })
      }
      onOk={() => {}}
      okText="Recend Offer"
      footer={[
        <Button
          onClick={() =>
            dispatch({
              type: 'SET_MY_OFFERS_MADE_MODAL_STATUS',
              value: false,
              nft: {},
            })
          }
        >
          Cancel
        </Button>,
        <Button onClick={() => {}} type="primary">
          Recend Offer
        </Button>,
      ]}
    >
      <img
        alt="nft to recend offer"
        src={imgLocation}
        style={{
          width: '250px',
          margin: 'auto',
          borderRadius: '10px',
          marginBottom: '15px',
        }}
      />
    </Modal>
  )
}

export default MyOffersModal
