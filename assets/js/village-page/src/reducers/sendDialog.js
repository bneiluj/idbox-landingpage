import * as types from '../actions/sendDialog-types';

const initialState = {
  ethAmount: 0, // The amount of ETH in the send dialog that the user would like to send
  etherUSDRate: 0, // The value of one ETH in USD
  transactionProcessing: false, // This is only true while the transaction is unconfirmed
  transactionHash: '', // If transactionHash.length > 0, then it means the transaction was successfully confirmed
  transactionError: false, // If there was an error processing the transaction
  networkType: '' // The type of the Ethereum network that is connected through MetaMask (e.g. Rinkeby)
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
    case types.SET_TRANSACTION_PROCESSING:
      return {
        ...state,
        transactionProcessing: action.transactionProcessing
      };
    case types.SET_TRANSACTION_HASH:
      return {
        ...state,
        transactionHash: action.transactionHash
      };
    case types.SET_TRANSACTION_ERROR:
      return {
        ...state,
        transactionError: action.transactionError
      };
    case types.SET_NETWORK_TYPE:
      return {
        ...state,
        networkType: action.networkType
      };
    default:
      return state;
  }
};
