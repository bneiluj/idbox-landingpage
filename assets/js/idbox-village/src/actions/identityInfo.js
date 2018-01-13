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
  { // This action calls the Etherchain API to get an account balance
    [RSAA]: {
      endpoint: 'https://api.etherscan.io/api?module=account&action=balance&tag=latest&apikey=' + config.etherscanAPIKey + '&address=' + address,
      method: 'GET',
      types: [types.LOAD_ETHER_BALANCE_BEGIN,
              types.LOAD_ETHER_BALANCE_SUCCESS,
              types.LOAD_ETHER_BALANCE_FAILURE],
    }
  }
);

export const setPhoneNumber = phoneNumber => (
  {
    type: types.SET_PHONE_NUMBER,
    phoneNumber
  }
);
