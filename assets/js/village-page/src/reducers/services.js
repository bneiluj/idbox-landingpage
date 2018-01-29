import * as types from '../actions/services-types';

const initialState = {
  selectedServiceData: {} // The data associated with the service that the user selected to finance in the village/camp
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTED_SERVICE_DATA:
      return {
        ...state,
        selectedServiceData: action.selectedServiceData
      };
    default:
      return state;
  }
};
