import * as types from '../actions/identityInfo-types';

const initialState = {
  cardScanned: false, // This field keeps track of what was most recently done: a card scanned OR a phone number entered.
                      //  - "true" means a card was just scanned (aka a card phone number was NOT just entered)
                      //  - "false" means ether a phone number was just inputted (aka a card was NOT just scanned) OR nothing has been entered/scanned (nether a card or phone number)
  address: '', // The user's ethereum address
  ethBalance: 0, // The user's ether balance
  scanningError: false, // Whether there was an error scanning a QR code
  loading: false, // Whether something is loading (the QR code scanning, the smart contract methods being called, etc.)
  phoneNumber: '' // The user's phone number
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CARD_SCANNED:
      return {
        ...state,
        cardScanned: action.cardScanned
      };
    case types.SET_ADDRESS:
      return {
        ...state,
        address: action.address
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case types.LOAD_ETHER_BALANCE_BEGIN:
      return {
        ...state,
        loading: true,
        scanningError: false
      };
    case types.LOAD_ETHER_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        ethBalance: (isNaN(action.payload.result) ? // Set balance to zero if not set
          0 : parseInt(action.payload.result, 10)
        )
      };
    case types.LOAD_ETHER_BALANCE_FAILURE:
      return {
        ...state,
        loading: false,
        scanningError: true,
        ethBalance: 0
      };
    case types.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber
      };
    default:
      return state;
  }
};