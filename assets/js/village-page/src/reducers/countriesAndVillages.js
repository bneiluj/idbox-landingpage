import * as types from '../actions/countriesAndVillages-types';

const initialState = {
  selectedCountry: '', // The country currently selected by the user
  selectedVillage: '', // The village currently selected by the user
  countries: ['Papua New Guinea', 'Kenya'], // Note: countries are hard-coded for now, but will need to come from smart-contract in the future...
  villages: { // Note: villages data is hard-coded for now, but will need to come from smart-contract in the future...
    'Alepa': {
      address: '0x17Bc58b788808DaB201a9A90817fF3C168BF3d61', // The address to deposit into
      population: 100 // The population of the village/camp
    },
    'Bagibobi': {
      address: '0x7963043CCBBb40a108c6a62f0cbE79e45dc4342f',
      population: 250
    },
    'Kore': {
      address: '0x80E29AcB842498fE6591F020bd82766DCe619D43',
      population: 75
    },
    'Waiori': {
      address: '0x8D3bDFFDECffc3a5aa1faa04163DfDC366DA049D',
      population: 900
    }
  }
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
