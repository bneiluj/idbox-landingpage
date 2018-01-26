import * as types from './countriesAndVillages-types';

export const setSelectedCountryName = selectedCountryName => (
  {
    type: types.SET_SELECTED_COUNTRY_NAME,
    selectedCountryName
  }
);

export const setSelectedVillageName = selectedVillageName => (
  {
    type: types.SET_SELECTED_VILLAGE_NAME,
    selectedVillageName
  }
);

export const setSelectedVillageData = selectedVillageData => (
  {
    type: types.SET_SELECTED_VILLAGE_DATA,
    selectedVillageData
  }
);

export const setCountries = countries => (
  {
    type: types.SET_COUNTRIES,
    countries
  }
);

export const setVillages = villages => (
  {
    type: types.SET_VILLAGES,
    villages
  }
);
