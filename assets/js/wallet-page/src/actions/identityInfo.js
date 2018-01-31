import {RSAA} from 'redux-api-middleware';
import * as types from './identityInfo-types';
import config from '../config';

export const setCardScanned = cardScanned => (
  {
    type: types.SET_CARD_SCANNED,
    cardScanned
  }
);

export const setAddress = address => (
  {
    type: types.SET_ADDRESS,
    address
  }
);

export const setLoading = loading => (
  {
    type: types.SET_LOADING,
    loading
  }
);

export const setEtherBalanceFailure = () => (
  {
    type: types.LOAD_ETHER_BALANCE_FAILURE
  }
);

export const loadEtherBalance = address => (
  { // This action calls the Etherchain Rinkeby (testnet) API to get an account balance
    [RSAA]: {
      endpoint: 'https://rinkeby.etherscan.io/api?module=account&action=balance&tag=latest&apikey=' + config.etherscanAPIKey + '&address=' + address,
      method: 'GET',
      types: [types.LOAD_ETHER_BALANCE_BEGIN,
              types.LOAD_ETHER_BALANCE_SUCCESS,
              types.LOAD_ETHER_BALANCE_FAILURE],
    }
  }
);

export const setZeroEtherBalance = () => (
  {
    type: types.SET_ZERO_ETHER_BALANCE
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

export const loadUSDLocalCurrencyRate = () => (
  { // This action calls the CurrencyConverterAPI API to get the value of one USD in the user's local currency
    [RSAA]: {
      endpoint: 'https://free.currencyconverterapi.com/api/v5/convert?q=USD_PGK&compact=y',
      method: 'GET',
      types: [types.LOAD_USD_LOCAL_CURRENCY_RATE_BEGIN,
              types.LOAD_USD_LOCAL_CURRENCY_RATE_SUCCESS,
              types.LOAD_USD_LOCAL_CURRENCY_RATE_FAILURE],
    }
  }
);

export const setPhoneNumber = phoneNumber => (
  {
    type: types.SET_PHONE_NUMBER,
    phoneNumber
  }
);

export const setEthAmount = ethAmount => (
  {
    type: types.SET_ETH_AMOUNT,
    ethAmount
  }
);

export const setTransactionProcessing = transactionProcessing => (
  {
    type: types.SET_TRANSACTION_PROCESSING,
    transactionProcessing
  }
);

export const setTransactionError = transactionError => (
  {
    type: types.SET_TRANSACTION_ERROR,
    transactionError
  }
);

export const setTransactionHash = transactionHash => (
  {
    type: types.SET_TRANSACTION_HASH,
    transactionHash
  }
);

export const setNetworkType = networkType => (
  {
    type: types.SET_NETWORK_TYPE,
    networkType
  }
);
