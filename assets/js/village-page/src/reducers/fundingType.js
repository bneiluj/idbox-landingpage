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
        donateDirectly: action.donateDirectly,
        financeServices: !action.donateDirectly // Ensure only one of the flags is true at a given time
      };
    case types.SET_FINANCE_SERVICES:
      return {
        ...state,
        financeServices: action.financeServices,
        donateDirectly: !action.financeServices // Ensure only one of the flags is true at a given time
      };
    default:
      return state;
  }
};
