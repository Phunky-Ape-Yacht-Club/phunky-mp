const initialState = {
  dataSource: [],
  collection: [],
  myListings: [],
  offersReceived: [],
  offersMade: [],
  selectedView: 'my_payc',
  isListingModalOpen: false,
  isMyListingModalOpen: false,
  isOffersReceivedModalOpen: false,
  isMyOffersMdatModalOpen: false,
  selectedNft: {},
  isGlobalLoadingStatus: false,
  hasUpdatedData: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_GRAPH_DATA':
      const collection = action.value
      const allApes = appendPhunkyInfo(collection.data.phunkyApes)
      return { ...state, dataSource: allApes, collection: allApes }
    case 'SET_COLLECTION_VIEW':
      let ds = []
      if (action.value === 'my_payc') {
        // nextMarketPlaceData = state.phunkyApeListedDB.search('goat')
        ds = state.collection
      } else if (action.value === 'my_listing') {
        ds = state.collection.filter((ape) => ape.isForSale === true)
      } else if (action.value === 'offers_received') {
        ds = state.collection.filter((ape) => {
          if (ape.phunkyApeBids.length > 0) {
            return ape
          }
        })
      } else if (action.value === 'offers_made') {
        ds = state.offersMade
      }

      return {
        ...state,
        selectedView: action.value,
        dataSource: ds,
      }
    case 'SET_MY_OFFER_DATA':
      const bids = appendPhunkyInfo(action.value.data.bids, true)
      return {
        ...state,
        offersMade: bids,
      }
    case 'SET_LISTING_MODAL_STATUS':
      return {
        ...state,
        isListingModalOpen: action.value,
        selectedNft: action.nft,
      }
    case 'SET_MY_LISTING_MODAL_STATUS':
      return {
        ...state,
        isMyListingModalOpen: action.value,
        selectedNft: action.nft,
      }
    case 'SET_OFFERS_RECEIVED_MODAL_STATUS':
      return {
        ...state,
        isOffersReceivedModalOpen: action.value,
        selectedNft: action.nft,
      }
    case 'SET_MY_OFFERS_MADE_MODAL_STATUS':
      return {
        ...state,
        isMyOffersMdatModalOpen: action.value,
        selectedNft: action.nft,
      }
    case 'SET_GLOBAL_LOADING_STATUS':
      return {
        ...state,
        isGlobalLoadingStatus: action.value,
      }
    case 'SET_START_LISTING_STATUS':
      return {
        ...state,
        // isGlobalLoadingStatus: true,
        isListingModalOpen: false,
      }
    case 'UPDATE_LISTING_DATA_FOR_NFT':
      return {
        ...state,
        // hasUpdatedData: !state.hasUpdatedData,
        // isGlobalLoadingStatus: false,
      }
    default:
      throw new Error()
  }
}

function getInitialState() {
  return initialState
}

// This can be refactored later I think, but for now we use phunkyApeId in a
// lot of places so it is better for our data to have it, same with num.
function appendPhunkyInfo(apes, isMyOffers = false) {
  if (!isMyOffers) {
    return apes.map((ape) => {
      const id = parseInt(ape.id, 16)
      ape.phunkyApeId = id
      ape.num = id
      return ape
    })
  } else {
    return apes.map((ape) => {
      const id = parseInt(ape.phunkyApe.id, 16)
      ape.phunkyApeId = id
      ape.num = id
      return ape
    })
  }
}

export { reducer, getInitialState }
