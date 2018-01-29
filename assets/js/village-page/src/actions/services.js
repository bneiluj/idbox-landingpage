import * as types from './services-types';

export const setSelectedServiceData = selectedServiceData => (
  {
    type: types.SET_SELECTED_SERVICE_DATA,
    selectedServiceData
  }
);
