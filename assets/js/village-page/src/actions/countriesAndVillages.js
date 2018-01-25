import * as types from './countriesAndVillages-types';

export const setSelectedCountry = selectedCountry => (
  {
    type: types.SET_SELECTED_COUNTRY,
    selectedCountry
  }
);

export const setSelectedVillage = selectedVillage => (
  {
    type: types.SET_SELECTED_VILLAGE,
    selectedVillage
  }
);
