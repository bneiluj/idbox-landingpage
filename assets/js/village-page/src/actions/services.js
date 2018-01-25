import * as types from './services-types';

export const setSelectedService = selectedService => (
  {
    type: types.SET_SELECTED_SERVICE,
    selectedService
  }
);
