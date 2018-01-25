import * as types from '../actions/countriesAndVillages-types';

const initialState = {
  selectedCountry: '', // The country currently selected by the user
  selectedVillage: '' // The village currently selected by the user
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: action.selectedCountry
      };
    case types.SET_SELECTED_VILLAGE:
      return {
        ...state,
        selectedVillage: action.selectedVillage
      };
    default:
      return state;
  }
};
