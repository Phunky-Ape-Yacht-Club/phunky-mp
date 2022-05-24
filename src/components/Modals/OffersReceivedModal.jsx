import { Modal, Input, Spin, Button } from 'antd'
import BN from 'bn.js'
import { acceptBid } from '../../contracts/contractUtil'

const localDirectory = '/ipfs/'

const OffersReceivedModal = ({ nft, visible, dispatch, web3, delegate }) => {
  const imgLocation = localDirectory + nft.num + '.png'

  const bids = nft.phunkyApeBids ? nft.phunkyApeBids : []
  const highestBid = bids[0] !== undefined ? new BN(bids[0].bidAmount) : ''
  const highestBidEth =
    web3 !== undefined ? web3.utils.fromWei(highestBid, 'ether') : ''

  const handleAcceptPayc = () => {
    console.log(nft.id)
    acceptBid(
      nft,
      highestBidEth,
      parseInt(nft.id, 16),
      web3,
      () => {
        // TODO: handle success globally
      },
      () => {
        // TODO: hnalde error globally
      }
    )
  }

  return (
    <Modal
      title={`Offers Received`}
      visible={visible}
      onCancel={() =>
        dispatch({
          type: 'SET_OFFERS_RECEIVED_MODAL_STATUS',
          value: false,
          nft: {},
        })
      }
      onOk={() => {}}
      okText="List"
      footer={[
        <Button
          onClick={() =>
            dispatch({
              type: 'SET_OFFERS_RECEIVED_MODAL_STATUS',
              value: false,
              nft: {},
            })
          }
        >
          Cancel
        </Button>,
        <Button onClick={handleAcceptPayc} type="primary">
          Accept Offer
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
      <h2>Highest Bid: {highestBidEth} Ξ</h2>
    </Modal>
  )
}

export default OffersReceivedModal
