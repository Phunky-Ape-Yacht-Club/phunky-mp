import { Modal, Input, Spin, Button } from 'antd'

const MyCurrentListingModal = ({ visible, dispatch, delegate }) => {
  console.log(visible)
  return (
    <Modal
      title={`My Current Listing`}
      visible={visible}
      onCancel={() =>
        dispatch({ type: 'SET_MY_LISTING_MODAL_STATUS', value: false, nft: {} })
      }
      onOk={() => {}}
      okText="List"
      footer={[
        <Button
          onClick={() =>
            dispatch({
              type: 'SET_MY_LISTING_MODAL_STATUS',
              value: false,
              nft: {},
            })
          }
        >
          Cancel
        </Button>,
        <Button onClick={() => {}} type="primary">
          Delist PAYC
        </Button>,
      ]}
    >
      <Spin>
        <img
          alt="nft to send"
          style={{
            width: '250px',
            margin: 'auto',
            borderRadius: '10px',
            marginBottom: '15px',
          }}
        />
        <Input autoFocus placeholder="Listing Price (Ξ)" onChange={(e) => {}} />
      </Spin>
    </Modal>
  )
}

export default MyCurrentListingModal
