import * as types from '../actions/textbox-types';

const initialState = {
  phoneNumber: '',
  phoneExists: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber
      };
    case types.SET_PHONE_EXISTS:
      return {
        ...state,
        phoneExists: action.phoneExists
      };
    default:
      return state;
  }
};
