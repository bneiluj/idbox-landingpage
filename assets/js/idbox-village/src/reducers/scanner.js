import * as types from '../actions/scanner-types';

const initialState = {
  address: '',
  legacyMode: false,
  etcBalance: 0,
  scanningError: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ADDRESS:
      return {
        ...state,
        address: action.address
      };
    case types.SET_LEGACY_MODE_TRUE:
      return {
        ...state,
        legacyMode: true
      };
    case types.LOAD_ETHER_BALANCE_BEGIN:
      return {
        ...state,
        loading: true,
        scanningError: false
      };
    case types.LOAD_ETHER_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        etcBalance: (isNaN(action.payload.result) ? // Set balance to zero if not set
          0 : parseInt(action.payload.result, 10)
        )
      }
    case types.LOAD_ETHER_BALANCE_FAILURE:
      return {
        ...state,
        loading: false,
        scanningError: true,
        etcBalance: 0
      }
    default:
      return state;
  }
};