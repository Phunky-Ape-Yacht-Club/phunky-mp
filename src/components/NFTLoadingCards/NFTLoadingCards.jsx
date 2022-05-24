import NFTCard from '../NFTCard/NFTCard'
const NFTLoadingCards = () => {
  const cards = []
  for (let i = 0; i < 20; i++) {
    cards.push(<NFTCard nft={{}} onClick={() => {}} isLoading={true} />)
  }

  return <>{cards.map((nft) => nft)}</>
}

export default NFTLoadingCards
