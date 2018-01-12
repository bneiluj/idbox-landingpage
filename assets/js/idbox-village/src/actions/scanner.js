import {RSAA} from 'redux-api-middleware';
import * as types from './scanner-types';
import config from '../config';

export const setAddress = address => (
  {
    type: types.SET_ADDRESS,
    address
  }
);

export const setLegacyModeTrue = () => (
  {
    type: types.SET_LEGACY_MODE_TRUE
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
