import scannerReducer from './scanner';
import * as types from '../actions/scanner-types';

describe('>>>R E D U C E R --- Test scannerReducer',() => {
  it('+++ reducer for SET_ADDRESS', () => {
    const newAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
    let state = {address: ''};
    state = scannerReducer(state, {type: types.SET_ADDRESS, address: newAddress});
    expect(state).toEqual({address: newAddress});
  });

  it('+++ reducer for SET_LEGACY_MODE_TRUE', () => {
    let state = {legacyMode: false};
    state = scannerReducer(state, {type: types.SET_LEGACY_MODE_TRUE});
    expect(state).toEqual({legacyMode: true});
  });

  it('+++ reducer for LOAD_ETHER_BALANCE_BEGIN', () => {
    let state = {loading: false, scanningError: true}; // We set scanningError to true because
                                                       // LOAD_ETHER_BALANCE_BEGIN should set it back to false
    state = scannerReducer(state, {type: types.LOAD_ETHER_BALANCE_BEGIN});
    expect(state).toEqual({loading: true, scanningError: false});
  });

  it('+++ reducer for LOAD_ETHER_BALANCE_SUCCESS', () => {
    let state = {loading: true, etcBalance: 0};
    state = scannerReducer(state, {
      type: types.LOAD_ETHER_BALANCE_SUCCESS,
      payload: {
        data: [{balance: 10}]
      }
    });
    expect(state).toEqual({loading: false, etcBalance: 10});
  });

  it('+++ reducer for LOAD_ETHER_BALANCE_FAILURE', () => {
    let state = {loading: true, scanningError: false, etcBalance: 100};
    state = scannerReducer(state, {type: types.LOAD_ETHER_BALANCE_FAILURE});
    expect(state).toEqual({loading: false, scanningError: true, etcBalance: 0});
  });
});
