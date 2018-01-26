import * as types from '../actions/sendDialog-types';

const initialState = {
  ethAmount: 0, // The amount of ETH in the send dialog that the user would like to send
  etherUSDRate: 0 // The value of one ETH in USD
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ETH_AMOUNT:
      return {
        ...state,
        ethAmount: action.ethAmount
      };
    // case types.LOAD_ETHER_USD_RATE_BEGIN:
    case types.LOAD_ETHER_USD_RATE_SUCCESS:
      return {
        ...state,
        etherUSDRate: ((action.payload.length > 0 && !isNaN(action.payload[0]['price_usd'])) ? // Check that the value has been returned and is numeric
          parseFloat(action.payload[0]['price_usd'], 10) : 0
        )
      };
    // case types.LOAD_ETHER_USD_RATE_FAILURE:
    default:
      return state;
  }
};
