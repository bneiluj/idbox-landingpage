import * as types from '../actions/services-types';

const initialState = {
  selectedService: '' // The service that the user selected to finance in the village/camp
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTED_SERVICE:
      return {
        ...state,
        selectedService: action.selectedService
      };
    default:
      return state;
  }
};
