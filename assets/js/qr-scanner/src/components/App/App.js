import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QrReader from 'react-qr-reader';
import ethereumAddress from '../../utils/ethereum-address';
import './App.css';
import * as scannerActions from '../../actions/scanner';

export class App extends Component { // Component is exported for testing without being connected to Redux
  handleScan = address => {
    // This function handles the event of a scan being processed by the QR reader

    // Check that the address has changed since the last scan (to prevent
    // flooding the API with requests)
    if (address && address.trim() !== this.props.address) {
      const {setAddress, loadEtherBalance, setEtherBalanceFailure} = this.props;
      // Check that the address is a valid Ethereum address
      if (ethereumAddress.isAddress(address.trim())) {
        setAddress(address.trim());
        loadEtherBalance(address.trim()); // Call API to update balance
      } else {
        // Mark as failure since address is invalid (error will be shown)
        setEtherBalanceFailure();
      }
    }
  }
  handleError = () => {
    // Since there was an error, we enable legacy mode (file upload dialog)
    this.props.setLegacyModeTrue();
  }
  render() {
    const {address, etcBalance, scanningError, loading, legacyMode} = this.props;

    return (
      <div className="App">
        {/* QR scanner */}
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          legacyMode={legacyMode}
          ref='scanner'
        />
        {/* Show file upload dialog if in legacy mode */}
        {legacyMode &&
          <div id='buttonWrap' className='text-center'>
            <button
              className='btn btn-cons m-t-10 btn-info xs-no-margin'
              onClick={() => this.refs.scanner.openImageDialog()} // Run QrReader on selected file
            >
              Scan Card
            </button>
          </div>
        }
        {/* Balance adjusted from Wei to Eth */}
        <h2 className='m-b-0'>{etcBalance / 1000000000000000000} ETH</h2>
        {/* If the address/balance is loaded without issue, show address */}
        {(!scanningError && !loading && address) &&
          <p>Address: {address}</p>
        }
        {/* If no QR code has been scanned, present instruction */}
        {(!scanningError && !loading && !address) &&
          <p>Scan card above to see balance</p>
        }
        {/* If the code is currently scanning... */}
        {(!scanningError && loading) &&
          <p>Scanning...</p>
        }
        {/* If there was an error scanning/getting the balance, say so */}
        {(scanningError) &&
          <p>There was an error scanning the QR code!</p>
        }
      </div>
    );
  }
}

App.propTypes = {
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  etcBalance: PropTypes.number.isRequired,
  scanningError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  legacyMode: PropTypes.bool.isRequired,
  setLegacyModeTrue: PropTypes.func.isRequired,
  loadEtherBalance: PropTypes.func.isRequired,
  setEtherBalanceFailure: PropTypes.func.isRequired
};

export default connect(
  state => ({
    address: state.scanner.address,
    etcBalance: state.scanner.etcBalance,
    scanningError: state.scanner.scanningError,
    loading: state.scanner.loading,
    legacyMode: state.scanner.legacyMode
  }),
  dispatch => ({
    setAddress: bindActionCreators(scannerActions.setAddress, dispatch),
    setLegacyModeTrue: bindActionCreators(scannerActions.setLegacyModeTrue, dispatch),
    loadEtherBalance: bindActionCreators(scannerActions.loadEtherBalance, dispatch),
    setEtherBalanceFailure: bindActionCreators(scannerActions.setEtherBalanceFailure, dispatch)
  })
)(App);
