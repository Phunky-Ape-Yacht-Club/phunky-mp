const initialState = {
  isConfettiOn: false,
  isTxnListOpen: false,
  txns: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_GLOBAL_LOADING_STATUS':
      return { ...state, isGlobalLoadingStatus: action.value }
    case 'ADD_TXN':
      const txns = state.txns
      txns.push(action.value)
      return { ...state, txns: txns }
    case 'ERROR_TXN':
      console.log('error txn')
      return { ...state }
    case 'SUCCESS_TXN':
      const next = state.txns
      for (let i = 0; i < next.length; i++) {
        if (next[i].id === action.value.id) {
          next[i] = action.value
        }
      }
      return { ...state, txns: next }
    case 'REMOVE_TXN':
      const nextTxns = state.txns.filter((txn) => {
        if (txn.id !== action.value.id) {
          return txn
        }
      })

      console.log('test', nextTxns)
      return { ...state, txns: nextTxns }
    case 'TOGGLE_TXN_LIST':
      return { ...state, isTxnListOpen: !state.isTxnListOpen }
    default:
      throw new Error()
  }
}

function getInitialState() {
  return initialState
}

export { reducer, getInitialState }
