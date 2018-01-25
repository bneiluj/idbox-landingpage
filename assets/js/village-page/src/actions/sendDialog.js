import * as types from './sendDialog-types';

export const setEthAmount = ethAmount => (
  {
    type: types.SET_ETH_AMOUNT,
    ethAmount
  }
);
