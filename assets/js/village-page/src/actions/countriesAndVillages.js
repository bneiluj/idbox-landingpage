import {RSAA} from 'redux-api-middleware';
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

export const addCountryGeoLocation = countryName => (
  { // This action calls the Google Maps API to get a country's coordinates from its name
    [RSAA]: {
      endpoint: 'http://maps.google.com/maps/api/geocode/json?address=' + encodeURIComponent(countryName),
      method: 'GET',
      types: [types.ADD_COUNTRY_GEO_LOCATION_BEGIN,
              types.ADD_COUNTRY_GEO_LOCATION_SUCCESS,
              types.ADD_COUNTRY_GEO_LOCATION_FAILURE],
    }
  }
);

export const setVillageGeoLocations = villageGeoLocations => (
  {
    type: types.SET_VILLAGE_GEO_LOCATIONS,
    villageGeoLocations
  }
);
