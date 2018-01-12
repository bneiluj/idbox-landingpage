import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';

import ConnectedApp, {App} from './App';
import * as scannerActions from '../../actions/scanner';
import * as types from '../../actions/scanner-types';
import allReducers from '../../reducers';
import QrReader from 'react-qr-reader';

/*
 * NOTE: The App component can only be tested using shallow render (not mount)
 * since the react-qr-reader component cannot be rendered during testing.
 * This, for example, means we cannot use Jest's Snapshot feature since it
 * relies on mounting the component (not shallow rendering). However, the
 * react-qr-reader component is sufficiently tested by the auther.
 * See: https://github.com/JodusNodus/react-qr-reader/issues/35
 */

Enzyme.configure({ adapter: new Adapter() });

// This is the initial state and is used throughout testing
const initialState = {
  scanner: {
    address: '',
    legacyMode: false,
    etcBalance: 0,
    scanningError: false,
    loading: false
  }
};

//*******************************************************************************************************
describe('>>>A P P --- Shallow Render REACT COMPONENTS', () => {
  let wrapper;

  beforeEach(() => {
    // In order to prevent "Failed prop type" warnings for Redux actions (not being
    // passed to component), we merge actions with the initialState and pass that:
    const initialStateWithReducers = Object.assign({}, initialState.scanner, scannerActions);
    wrapper = shallow(<App {...initialStateWithReducers} />);
  });

  it('+++ render the DUMB component', () => {
    expect(wrapper.length).toBe(1);
  });

  it('+++ contains div wrapper - div.App', () => {
    expect(wrapper.find('div.App').length).toBe(1);
  });

  it('+++ contains QR scanner - QrReader', () => {
    expect(wrapper.find(QrReader).length).toBe(1);
  });

  it('+++ does not contain legacy mode button - div#buttonWrap', () => {
    expect(wrapper.find('div#buttonWrap').length).toBe(0);
  });

  it('+++ contains ETH total text - h2', () => {
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h2').text()).toBe(initialState.scanner.etcBalance + ' ETH');
    // expect(wrapper.find('h2').text()).toMatch(/.*ETH$/);
  });

  it('+++ contains scan card above text - p', () => {
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').text()).toMatch('Scan card above to see balance');
  });
});

//*******************************************************************************************************
describe('>>>A P P --- Shallow Render REACT COMPONENTS and test UI with different state flags', () => {
  const mockStore = configureStore();
  let store, initialStateWithReducers;

  beforeEach(() => {
    store = mockStore(initialState);
    // In order to prevent "Failed prop type" warnings for Redux actions (not being
    // passed to component), we merge actions with the initialState and pass that:
    initialStateWithReducers = Object.assign({}, initialState.scanner, scannerActions);
  });

  it('+++ shows div button wrapper - div#buttonWrap', () => {
    const stateWithAdjustedFlags = {
      ...initialStateWithReducers,
      legacyMode: true,
    };
    const container = shallow(<App {...stateWithAdjustedFlags} />);

    expect(container.find('div#buttonWrap').length).toBe(1);
    expect(container.find('div#buttonWrap').find('button').length).toBe(1);
    expect(container.find('div#buttonWrap').find('button').text()).toBe('Scan Card');
  });

  it('+++ div button runs onClick handler when pressed - button', () => {
    const stateWithAdjustedFlags = {
      ...initialStateWithReducers,
      legacyMode: true,
    };
    const container = shallow(<App {...stateWithAdjustedFlags} />);

    // We create a mock function and set it equal to a ref property (since the
    // button calls the ref property when clicked)
    const mockOpenImageDialog = jest.fn();
    container.instance().refs = {
      scanner: {
        openImageDialog: mockOpenImageDialog
      }
    };

    // We then simulate a click on the button element
    container.find('button').simulate('click', { preventDefault () {} });

    expect(mockOpenImageDialog.mock.calls.length).toBe(1);
  });

  it('+++ shows ETH total text - p', () => {
    const newAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
    const stateWithAdjustedFlags = {
      ...initialStateWithReducers,
      scanningError: false,
      loading: false,
      address: newAddress
    };
    const container = shallow(<App {...stateWithAdjustedFlags} />);

    expect(container.find('p').length).toBe(1);
    expect(container.find('p').text()).toBe('Address: ' + newAddress);
  });

  it('+++ shows scan card above text - p', () => {
    const stateWithAdjustedFlags = {
      ...initialStateWithReducers,
      scanningError: false,
      loading: false,
      address: ''
    };
    const container = shallow(<App {...stateWithAdjustedFlags} />);

    expect(container.find('p').length).toBe(1);
    expect(container.find('p').text()).toBe('Scan card above to see balance');
  });

  it('+++ shows scan card above text - p', () => {
    const stateWithAdjustedFlags = {
      ...initialStateWithReducers,
      scanningError: false,
      loading: true
    };
    const container = shallow(<App {...stateWithAdjustedFlags} />);

    expect(container.find('p').length).toBe(1);
    expect(container.find('p').text()).toBe('Scanning...');
  });

  it('+++ shows scanning error text - p', () => {
    const stateWithAdjustedFlags = {
      ...initialStateWithReducers,
      scanningError: true
    };
    const container = shallow(<App {...stateWithAdjustedFlags} />);

    expect(container.find('p').length).toBe(1);
    expect(container.find('p').text()).toBe('There was an error scanning the QR code!');
  });
});

//*******************************************************************************************************
describe('>>>A P P --- Shallow Render REACT COMPONENTS and test component functions', () => {
  const mockStore = configureStore();
  let store, mockSetAddress, mockLoadEtherBalance, mockSetEtherBalanceFailure, initialStateWithReducers, mockSetLegacyModeTrue;

  beforeEach(() => {
    store = mockStore(initialState);

    // Create mock functions for testing
    mockSetAddress = jest.fn();
    mockLoadEtherBalance = jest.fn();
    mockSetEtherBalanceFailure = jest.fn();
    mockSetLegacyModeTrue = jest.fn();
    // In order to prevent "Failed prop type" warnings for Redux actions (not being
    // passed to component), we merge actions with the initialState and pass that:
    initialStateWithReducers = Object.assign({}, initialState.scanner, scannerActions);
  });

  it('+++ test handleScan function with valid address', () => {
    const stateWithMockFunctions = {
      ...initialStateWithReducers,
      setAddress: mockSetAddress,
      loadEtherBalance: mockLoadEtherBalance,
      setEtherBalanceFailure: mockSetEtherBalanceFailure
    };

    const container = shallow(<App {...stateWithMockFunctions} />);
    const newAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
    container.instance().handleScan(newAddress);

    // Check correct mock functions are called
    expect(mockSetAddress.mock.calls.length).toBe(1);
    expect(mockSetAddress.mock.calls[0].length).toBe(1);
    expect(mockSetAddress.mock.calls[0][0]).toBe(newAddress);
    expect(mockLoadEtherBalance.mock.calls.length).toBe(1);
    expect(mockLoadEtherBalance.mock.calls[0].length).toBe(1);
    expect(mockLoadEtherBalance.mock.calls[0][0]).toBe(newAddress);
    expect(mockSetEtherBalanceFailure.mock.calls.length).toBe(0);
  });

  it('+++ test handleScan function with invalid address', () => {
    const stateWithMockFunctions = {
      ...initialStateWithReducers,
      setAddress: mockSetAddress,
      loadEtherBalance: mockLoadEtherBalance,
      setEtherBalanceFailure: mockSetEtherBalanceFailure
    };

    const container = shallow(<App {...stateWithMockFunctions} />);
    const newAddress = 'invalid';
    container.instance().handleScan(newAddress);

    // Check correct mock functions are called
    expect(mockSetAddress.mock.calls.length).toBe(0);
    expect(mockLoadEtherBalance.mock.calls.length).toBe(0);
    expect(mockSetEtherBalanceFailure.mock.calls.length).toBe(1);
  });

  it('+++ test handleError function ', () => {
    const stateWithMockFunctions = {
      ...initialStateWithReducers,
      setLegacyModeTrue: mockSetLegacyModeTrue
    };

    const container = shallow(<App {...stateWithMockFunctions} />);
    container.instance().handleError();

    // Check correct mock function is called
    expect(mockSetLegacyModeTrue.mock.calls.length).toBe(1);
  });
});

//*******************************************************************************************************
describe('>>>A P P --- REACT-REDUX (Shallow + passing the {store} directly)', () => {
  const mockStore = configureStore([apiMiddleware]); // We apply API middleware since there is an API call in this test
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedApp store={store} />);
  });

  it('+++ render the connected (SMART) component', () => {
    expect(container.length).toBe(1)
  });

  it('+++ check Props match with initialState', () => {
    expect(container.prop('address')).toBe(initialState.scanner.address);
    expect(container.prop('etcBalance')).toBe(initialState.scanner.etcBalance);
    expect(container.prop('scanningError')).toBe(initialState.scanner.scanningError);
    expect(container.prop('loading')).toBe(initialState.scanner.loading);
    expect(container.prop('legacyMode')).toBe(initialState.scanner.legacyMode);
  });

  it('+++ check actions after dispatch ', done => {
    let action;
    // First, we call all actions
    store.dispatch(scannerActions.setAddress('test'));
    store.dispatch(scannerActions.setLegacyModeTrue());
    store.dispatch(scannerActions.setEtherBalanceFailure());
    store.dispatch(scannerActions.loadEtherBalance()).then(() => {
      // Lastly, we check the action types (after the API promise returns)
      action = store.getActions();
      expect(action[3].type).toBe(types.LOAD_ETHER_BALANCE_BEGIN);
      expect(action[4].type).toBe(types.LOAD_ETHER_BALANCE_SUCCESS);
      done();
    });
    // Now we check the action types (of all actions not waiting on API promise to return)
    action = store.getActions();
    expect(action[0].type).toBe(types.SET_ADDRESS);
    expect(action[1].type).toBe(types.SET_LEGACY_MODE_TRUE);
    expect(action[2].type).toBe(types.LOAD_ETHER_BALANCE_FAILURE);
  });
});
