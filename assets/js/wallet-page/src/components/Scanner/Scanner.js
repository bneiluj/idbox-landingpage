import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QrReader from 'react-qr-reader';
import ethereumAddress from '../../utils/ethereum-address';
import * as scannerActions from '../../actions/scanner';
import * as identityInfoActions from '../../actions/identityInfo';
import createVillageContract from '../../utils/villageContract';

export class Scanner extends Component { // Component is exported for testing without being connected to Redux
  callContractPhoneMethod = address => {
    // This function is used to call the method of the smart contract for fetching the phone number

    const {setPhoneNumber, setZeroEtherBalance} = this.props;

    // Create an instance of the contract
    createVillageContract().then(IDBoxVillageContract => {
      // We now call a method of the smart contract and pass it the ethereum address
      IDBoxVillageContract.methods.findIdboxUserByWalletPK(address).call().then(result => {
        const phoneNumber = result[0]; // The phone is the second field returned
        // Save the newly fetched phone number to redux
        setPhoneNumber(phoneNumber);
      }, err => {
        // Save blank phone number since there was an error
        setPhoneNumber('');
        setZeroEtherBalance();
        // Emit error
        console.error('There was an error calling the smart contract:');
        return console.error(err);
      });
    }, err => {
      // Save blank phone number since there was an error
      setPhoneNumber('');
      setZeroEtherBalance();
      // Emit error
      console.error(err);
    });
  }
  handleScan = address => {
    // This function handles the event of a scan being processed by the QR reader

    // Check that the address has changed since the last scan (to prevent flooding the API with requests)
    if (address && address.trim() !== this.props.address) {
      const {setCardScanned, setAddress, loadEtherBalance, setEtherBalanceFailure} = this.props;
      // Check that the address is a valid Ethereum address
      if (ethereumAddress.isAddress(address.trim())) {
        // Save the scanned ethereum address to redux
        setAddress(address.trim());
        // Load the user's ether balance using the newly scanned ethereum address
        loadEtherBalance(address.trim()); // Call API to update balance
        // Now we call a method of the smart contract to get the phone number associated with this ethereum address (if it exists)
        this.callContractPhoneMethod(address.trim());
      } else {
        // Mark as failure since the address is invalid (error will be shown)
        setEtherBalanceFailure();
      }
      // Mark card as just scanned (regardless of whether there was an error)
      setCardScanned(true);
    }
  }
  handleError = () => {
    // Since there was an error, we enable legacy mode (file upload dialog)
    this.props.setLegacyModeTrue();
  }
  render() {
    const {legacyMode} = this.props;

    return (
      <div>
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
      </div>
    );
  }
}

Scanner.propTypes = {
  setCardScanned: PropTypes.func.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  legacyMode: PropTypes.bool.isRequired,
  setLegacyModeTrue: PropTypes.func.isRequired,
  loadEtherBalance: PropTypes.func.isRequired,
  setEtherBalanceFailure: PropTypes.func.isRequired,
  setZeroEtherBalance: PropTypes.func.isRequired
};

export default connect(
  state => ({
    address: state.identityInfo.address,
    legacyMode: state.scanner.legacyMode
  }),
  dispatch => ({
    setCardScanned: bindActionCreators(identityInfoActions.setCardScanned, dispatch),
    setPhoneNumber: bindActionCreators(identityInfoActions.setPhoneNumber, dispatch),
    setAddress: bindActionCreators(identityInfoActions.setAddress, dispatch),
    setLegacyModeTrue: bindActionCreators(scannerActions.setLegacyModeTrue, dispatch),
    loadEtherBalance: bindActionCreators(identityInfoActions.loadEtherBalance, dispatch),
    setEtherBalanceFailure: bindActionCreators(identityInfoActions.setEtherBalanceFailure, dispatch),
    setZeroEtherBalance: bindActionCreators(identityInfoActions.setZeroEtherBalance, dispatch)
  })
)(Scanner);
