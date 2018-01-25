import * as types from '../actions/sendDialog-types';

const initialState = {
  ethAmount: 0 // The amount of ETH in the send dialog that the user would like to send
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ETH_AMOUNT:
      return {
        ...state,
        ethAmount: action.ethAmount
      };
    default:
      return state;
  }
};
