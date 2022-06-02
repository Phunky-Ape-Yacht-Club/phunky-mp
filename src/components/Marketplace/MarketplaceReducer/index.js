import { ConsoleSqlOutlined } from '@ant-design/icons'
import { getApes, getAllApes, createNewFuseDbFromApeIds } from '../../../db'

const initialState = {
  bg: '',
  clothes: '',
  earring: '',
  eyes: '',
  fur: '',
  hat: '',
  mouth: '',
  id: ['', '', '', ''],
  selectedFilter: '',
  selectorIsOpen: false,
  selectedView: 'for_sale',
  galleryData: [],
  isFuseQueryLoading: false,
  subgraphData: {},
  phunkyApeListedDB: null,
  phunkyApeBidsDB: null,
  phunkyApeListed: [],
  phunkyApeBids: [],
  isGlobalLoadingStatus: false,
  isConfettiOn: false,
  hideFilters: false,
}

function getInitialState() {
  return initialState
}

// Market Place Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'SELECT':
      const nextState = {
        ...state,
        [action.key]: action.value !== 'none' ? action.value : '',
        selectedFilter: '',
        selectorIsOpen: false,
        isFuseQueryLoading: true,
      }
      return nextState
    case 'SET_ID_QUERY':
      const currentIdQuery = state.id
      currentIdQuery[action.index] = action.value
      return { ...state, id: currentIdQuery }
    case 'TOGGLE_FILTER':
      const isFilterValueDifferent = action.value !== state.selectedFilter
      // Case a new header is selected
      if (isFilterValueDifferent) {
        return { ...state, selectorIsOpen: true, selectedFilter: action.value }
      } else {
        // Case same header is selected
        const nextOpenState = !state.selectorIsOpen
        const filterValue = nextOpenState === true ? action.value : ''
        return {
          ...state,
          selectorIsOpen: nextOpenState,
          selectedFilter: filterValue,
        }
      }
    case 'SET_VIEW':
      let nextMarketPlaceData = []

      if (action.value === 'for_sale') {
        nextMarketPlaceData = state.phunkyApeListedDB.search('goat')
      } else if (action.value === 'has_bids') {
        nextMarketPlaceData = state.phunkyApeBidsDB.search('goat')
      } else {
        nextMarketPlaceData = getAllApes()
      }

      const newViewState = {
        ...initialState,
        phunkyApeListedDB: state.phunkyApeListedDB,
        phunkyApeBidsDB: state.phunkyApeBidsDB,
        phunkyApeListed: state.phunkyApeListedDB.search('goat'),
        phunkyApeBids: state.phunkyApeBidsDB.search('goat'),
        selectedView: action.value,
        galleryData: nextMarketPlaceData,
      }

      return newViewState
    case 'SET_FUSE_DATA':
      // respect the current view
      let apes = []
      if (state.selectedView === 'for_sale') {
        apes = getApes(state, state.phunkyApeListedDB, true)
      } else if (state.selectedView === 'has_bids') {
        apes = getApes(state, state.phunkyApeBidsDB, true)
      } else {
        apes = getApes(state)
      }

      return {
        ...state,
        galleryData: apes,
      }
    case 'SET_FUSE_QUERY_LOADING':
      return {
        ...state,
        isFuseQueryLoading: action.value,
      }
    case 'RESET_ID_QUERY':
      return {
        ...state,
        id: ['', '', '', ''],
      }
    case 'SET_SUBGRAPH_DATA':
      console.log(action.value.data)
      const apeListed = action.value.data.phunkyApes.map((ape) => {
        return normalizeApe(ape, true)
      })
      const apeBids = action.value.data.bids.map((ape) => {
        const payc = normalizeApe(ape.phunkyApe, true)
        ape.phunkyApeId = payc.phunkyApeId
        return ape
      })

      const listedDB = createNewFuseDbFromApeIds(apeListed)
      const bidsDB = createNewFuseDbFromApeIds(apeBids)

      console.log(listedDB)

      let nextDB = []
      if (state.selectedView === 'for_sale') {
        nextDB = listedDB.search('goat')
      } else if (state.selectedView === 'has_bids') {
        nextDB = bidsDB.search('goat')
      } else {
        nextDB = getAllApes()
      }

      return {
        ...state,
        phunkyApeListedDB: listedDB,
        phunkyApeBidsDB: bidsDB,
        phunkyApeListed: apeListed, // we need to keep a reference to the original for when we modify it and need to create a new instance of fuse
        phunkyApeBids: apeBids,
        galleryData: nextDB,
      }
    case 'RESET':
      const gallery = state.phunkyApeListedDB.search('goat')
      const resetState = {
        ...initialState,
        phunkyApeListedDB: state.phunkyApeListedDB,
        phunkyApeBidsDB: state.phunkyApeBidsDB,
        phunkyApeListed: gallery,
        phunkyApeBids: state.phunkyApeBidsDB.search('goat'),
        galleryData: gallery,
      }

      return resetState
    case 'SET_GLOBAL_LOADING_STATUS':
      return {
        ...state,
        isGlobalLoadingStatus: action.value,
      }
    case 'REMOVE_APE_FROM_LISTING_DB':
      const listedDbAfterRemove = state.phunkyApeListed.filter((ape) => {
        const phunkyId = parseInt(ape.id)
        return phunkyId !== action.value
      })
      const listedDbAfterRemoveDB =
        createNewFuseDbFromApeIds(listedDbAfterRemove)

      return {
        ...state,
        isGlobalLoadingStatus: false,
        isTxnSuccess: true,
        isPlayingConfetti: true,
        phunkyApeListedDB: listedDbAfterRemoveDB,
        phunkyApeListed: listedDbAfterRemove,
        galleryData: listedDbAfterRemoveDB.search('goat'),
      }
    case 'TURN_CONFETTI_OFF':
      return {
        ...state,
        isConfettiOn: false,
      }
    case 'TOGGLE_HIDE_FILTERS':
      return {
        ...state,
        hideFilters: !state.hideFilters,
      }
    default:
      throw new Error()
  }
}

// TODO: ask 2PAYC to normalize data from graph
const normalizeApe = (ape, isHex) => {
  const clone = { ...ape }
  if (isHex) {
    clone.phunkyApeId = parseInt(ape.id, 16)
  } else {
    clone.phunkyApeId = parseInt(ape.id)
  }

  return clone
}

export { reducer, getInitialState }
