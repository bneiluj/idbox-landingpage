import * as types from './fundingType-types';

export const setDonateDirectly = donateDirectly => (
  {
    type: types.SET_DONATE_DIRECTLY,
    donateDirectly
  }
);

export const setFinanceServices = financeServices => (
  {
    type: types.SET_FINANCE_SERVICES,
    financeServices
  }
);
