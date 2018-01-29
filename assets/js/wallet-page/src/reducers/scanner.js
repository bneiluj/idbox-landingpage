import * as types from '../actions/scanner-types';

const initialState = {
  legacyMode: false // Indicates whether legacy mode is enabled (aka a file upload is used for the QR code scanner)
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LEGACY_MODE_TRUE:
      return {
        ...state,
        legacyMode: true
      };
    default:
      return state;
  }
};