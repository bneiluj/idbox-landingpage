import * as types from './textbox-types';

export const setPhoneNumber = phoneNumber => (
  {
    type: types.SET_PHONE_NUMBER,
    phoneNumber
  }
);

export const setPhoneExists = phoneExists => (
  {
    type: types.SET_PHONE_EXISTS,
    phoneExists
  }
);
