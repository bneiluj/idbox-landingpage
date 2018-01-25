import * as types from '../actions/fundingType-types';

const initialState = {
  donateDirectly: false, // True if the user selected to donate to a village/camp directly
  financeServices: false // True if the user selected to finance services in a village/camp
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
