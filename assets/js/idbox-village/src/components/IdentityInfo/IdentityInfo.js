import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as identityInfoActions from '../../actions/identityInfo';

export class IdentityInfo extends Component { // Component is exported for testing without being connected to Redux
  componentWillReceiveProps(nextProps) {
    const {weiBalance, loadEtherUSDRate, loadUSDLocalCurrencyRate} = this.props;
    if (weiBalance !== nextProps.weiBalance) { // Check if the wei balance has changed
      loadEtherUSDRate(); // Call API to get the value of one ether in USD
      loadUSDLocalCurrencyRate(); // Call API to get the value of one USD in the user's local currency
    }
  }
  render() {
    const {address, phoneNumber, weiBalance, scanningError, loading, etherUSDRate, USDLocalCurrencyRate} = this.props;

    const showAddress = (!loading && address); // Whether an address exists (to be displayed)
    const showPhoneNumber = (!loading && phoneNumber); // Whether a phone number exists (to be displayed)

    const ethBalance = weiBalance / 1000000000000000000;
    const localCurrencyValue = ethBalance * etherUSDRate * USDLocalCurrencyRate;

    return (
      <div>
        {/* Balance adjusted from Wei to Eth */}
        {(!scanningError) &&
          <h2 className='m-b-0'>{ethBalance} ETH</h2>
        }
        {/* If there is no scanning error, show the value of the user's ether in their local currency (rounded to two decimal places) */}
        {(!scanningError) &&
          <p className='m-t-0 m-b-0'>({Math.round(localCurrencyValue * 100) / 100} PGK)</p>
        }
        {/* If there is no scanning error, show the address if it exists */}
        {(!scanningError) &&
          <p className='m-t-0 m-b-0'>Address: {showAddress ? address : 'not found'}</p>
        }
        {/* If there is no scanning error, show the phone number if it exists */}
        {(!scanningError) &&
          <p className='m-t-0 m-b-0'>Phone Number: {showPhoneNumber ? phoneNumber : 'not found'}</p>
        }
        {/* If the identity is currently loading... */}
        {(!scanningError && loading) &&
          <p className='m-t-0 m-b-0'>Loading...</p>
        }
        {/* If there was an error scanning the QR code, say so */}
        {scanningError &&
          <p className='m-t-10'>There was an error scanning the QR code!</p>
        }
      </div>
    );
  }
}

IdentityInfo.propTypes = {
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  weiBalance: PropTypes.number.isRequired,
  scanningError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  etherUSDRate: PropTypes.number.isRequired,
  USDLocalCurrencyRate: PropTypes.number.isRequired,
  loadEtherUSDRate: PropTypes.func.isRequired,
  loadUSDLocalCurrencyRate: PropTypes.func.isRequired
};

export default connect(
  state => ({
    address: state.identityInfo.address,
    phoneNumber: state.identityInfo.phoneNumber,
    weiBalance: state.identityInfo.weiBalance,
    etherUSDRate: state.identityInfo.etherUSDRate,
    USDLocalCurrencyRate: state.identityInfo.USDLocalCurrencyRate,
    scanningError: state.identityInfo.scanningError,
    loading: state.identityInfo.loading
  }),
  dispatch => ({
    loadEtherUSDRate: bindActionCreators(identityInfoActions.loadEtherUSDRate, dispatch),
    loadUSDLocalCurrencyRate: bindActionCreators(identityInfoActions.loadUSDLocalCurrencyRate, dispatch)
  })
)(IdentityInfo);
