import {RSAA} from 'redux-api-middleware';
import * as types from './sendDialog-types';

export const setEthAmount = ethAmount => (
  {
    type: types.SET_ETH_AMOUNT,
    ethAmount
  }
);

export const loadEtherUSDRate = () => (
  { // This action calls the CoinMarketCap API to get the value of one ether in USD
    [RSAA]: {
      endpoint: 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD',
      method: 'GET',
      types: [types.LOAD_ETHER_USD_RATE_BEGIN,
              types.LOAD_ETHER_USD_RATE_SUCCESS,
              types.LOAD_ETHER_USD_RATE_FAILURE],
    }
  }
);

export const setTransactionProcessing = transactionProcessing => (
  {
    type: types.SET_TRANSACTION_PROCESSING,
    transactionProcessing
  }
);

export const setTransactionHash = transactionHash => (
  {
    type: types.SET_TRANSACTION_HASH,
    transactionHash
  }
);

export const setTransactionError = transactionError => (
  {
    type: types.SET_TRANSACTION_ERROR,
    transactionError
  }
);
