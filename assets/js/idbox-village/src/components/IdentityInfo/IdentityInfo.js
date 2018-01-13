import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export class IdentityInfo extends Component { // Component is exported for testing without being connected to Redux
  render() {
    const {address, phoneNumber, ethBalance, scanningError, loading} = this.props;

    const showAddress = (!loading && address); // Whether an address exists (to be displayed)
    const showPhoneNumber = (!loading && phoneNumber); // Whether a phone number exists (to be displayed)

    return (
      <div>
        {/* Balance adjusted from Wei to Eth */}
        {(!scanningError) &&
          <h2 className='m-b-0'>{ethBalance / 1000000000000000000} ETH</h2>
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
  ethBalance: PropTypes.number.isRequired,
  scanningError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    address: state.identityInfo.address,
    phoneNumber: state.identityInfo.phoneNumber,
    ethBalance: state.identityInfo.ethBalance,
    scanningError: state.identityInfo.scanningError,
    loading: state.identityInfo.loading
  }),
  null
)(IdentityInfo);
