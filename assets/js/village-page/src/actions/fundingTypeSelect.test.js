import {RSAA} from 'redux-api-middleware';
import * as fundingTypeSelect from './fundingTypeSelect';
import * as types from './scanner-types';

describe('>>>A C T I O N --- Test fundingTypeSelect', () => {
  it('+++ actionCreator setAddress', () => {
    const newAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
    const address = fundingTypeSelect.setAddress(newAddress);
    expect(address).toEqual({type: types.SET_ADDRESS, address: newAddress});
  });

  it('+++ actionCreator setLegacyModeTrue', () => {
    const legacyMode = fundingTypeSelect.setLegacyModeTrue();
    expect(legacyMode).toEqual({type: types.SET_LEGACY_MODE_TRUE});
  });

  it('+++ actionCreator setEtherBalanceFailure', () => {
    const etherBalanceFailure = fundingTypeSelect.setEtherBalanceFailure();
    expect(etherBalanceFailure).toEqual({type: types.LOAD_ETHER_BALANCE_FAILURE});
  });

  it('+++ actionCreator loadEtherBalance', () => {
    const newAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
    const loadEtherBalance = fundingTypeSelect.loadEtherBalance(newAddress);
    expect(loadEtherBalance).toEqual({
      [RSAA]: {
        endpoint: 'https://etherchain.org/api/account/' + newAddress,
        method: 'GET',
        types: [types.LOAD_ETHER_BALANCE_BEGIN,
                types.LOAD_ETHER_BALANCE_SUCCESS,
                types.LOAD_ETHER_BALANCE_FAILURE],
      }
    });
  });
});
