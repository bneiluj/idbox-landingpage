import * as types from '../actions/countriesAndVillages-types';

const initialState = {
  selectedCountryName: '', // The country currently selected by the user
  selectedVillageName: '', // The name of the village currently selected by the user
  selectedVillageData: {}, // The data associated with the village currently selected by the user, from the hard-coded JSON (will be from smart-contract in the future...)
  countries: [], // The list of countries loaded from hard-coded JSON (will be from smart-contract in the future...)
  villages: [] // The list of villages in the country loaded from hard-coded JSON (will be from smart-contract in the future...)
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTED_COUNTRY_NAME:
      return {
        ...state,
        selectedCountryName: action.selectedCountryName
      };
    case types.SET_SELECTED_VILLAGE_NAME:
      return {
        ...state,
        selectedVillageName: action.selectedVillageName
      };
    case types.SET_SELECTED_VILLAGE_DATA:
      return {
        ...state,
        selectedVillageData: action.selectedVillageData
      };
    case types.SET_COUNTRIES:
      return {
        ...state,
        countries: action.countries
      };
    case types.SET_VILLAGES:
      return {
        ...state,
        villages: action.villages
      };
    default:
      return state;
  }
};
