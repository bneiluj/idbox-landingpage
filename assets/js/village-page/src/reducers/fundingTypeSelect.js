import * as types from '../actions/fundingTypeSelect-types';

const initialState = {
  donateDirectly: false,
  financeServices: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DONATE_DIRECTLY:
      return {
        ...state,
        donateDirectly: action.donateDirectly
      };
    case types.SET_FINANCE_SERVICES:
      return {
        ...state,
        financeServices: action.financeServices
      };
    default:
      return state;
  }
};
