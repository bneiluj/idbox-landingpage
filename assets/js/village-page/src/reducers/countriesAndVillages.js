import * as types from '../actions/countriesAndVillages-types';

const initialState = {
  selectedCountryName: '', // The country currently selected by the user
  selectedVillageName: '', // The name of the village currently selected by the user
  selectedVillageData: {}, // The data associated with the village currently selected by the user, from the hard-coded JSON (will be from smart-contract in the future...)
  countries: [], // The list of countries loaded from hard-coded JSON (will be from smart-contract in the future...)
  villages: [], // The list of villages in the country loaded from hard-coded JSON (will be from smart-contract in the future...)
  countryGeoLocations: [], // A list of country lat/long location objects (e.g.: [{lat: x, lng: y}, {lat: x, lng: y}, ...])
  villageGeoLocations: [] // A list of village lat/long location objects (e.g.: [{lat: x, lng: y}, {lat: x, lng: y}, ...])
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
    // case types.ADD_COUNTRY_GEO_LOCATION_BEGIN:
    case types.ADD_COUNTRY_GEO_LOCATION_SUCCESS:
      // If the Google Maps API request didn't work, don't add the geo location...
      if (action.payload.results === undefined || action.payload.results.length === 0 || action.payload.results[0].address_components === undefined || action.payload.results[0].address_components.length === 0 || action.payload.results[0].address_components[0].long_name === undefined ||
          action.payload.results[0].address_components[0].long_name.length === 0 || action.payload.results[0].geometry.location === undefined || isNaN(action.payload.results[0].geometry.location.lat) || isNaN(action.payload.results[0].geometry.location.lng)) {
        return state;
      }
      // The needed values are defined, so we can add it to the countryGeoLocations field...
      return {
        ...state,
        countryGeoLocations: [
          ...(state.countryGeoLocations),
          {
            name: action.payload.results[0].address_components[0].long_name,
            lat: action.payload.results[0].geometry.location.lat,
            lng: action.payload.results[0].geometry.location.lng
          }
        ]
      };
    // case types.ADD_COUNTRY_GEO_LOCATION_FAILURE:
    case types.SET_VILLAGE_GEO_LOCATIONS:
      return {
        ...state,
        villageGeoLocations: action.villageGeoLocations
      };
    default:
      return state;
  }
};
