import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Phone, {isValidPhoneNumber} from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import * as identityInfoActions from '../../actions/identityInfo';
import createVillageContract from '../../utils/villageContract';

export class Textbox extends Component { // Component is exported for testing without being connected to Redux
  handlePhoneChange = phoneNumber => {
    // This function handles the event of the phone number value changing in the text input

    const {setCardScanned, setPhoneNumber, setAddress, loadEtherBalance, setLoading, setZeroEtherBalance} = this.props;
    // Check if the number is a complete and valid phone number
    if (isValidPhoneNumber(phoneNumber)) {
      // Show the "Loading..." text while we fetch the address from the smart contract
      setLoading(true);

      // Create an instance of the contract
      createVillageContract().then(IDBoxVillageContract => {
        // Since the phone number is valid, we call a method of the smart contract
        IDBoxVillageContract.methods.findIdboxUserByPhoneNumber(phoneNumber.replace(/\D/g,'')).call().then(result => {
          const address = result[1]; // The address is the second field returned
          // Save the address to redux
          setAddress(address.trim());
          // Load the user's ether balance using the newly fetched ethereum address
          loadEtherBalance(address.trim()); // Call API to update balance
        }, err => {
          // Save blank address since there was an error
          setAddress('');
          setZeroEtherBalance(); 
          // Emit error
          console.error('There was an error calling the smart contract:');
          return console.error(err);
        });
      }, err => {
        // Save blank address since there was an error
        setAddress('');
        setZeroEtherBalance();
        // Emit error
        return console.error(err);
      });
      // Mark card as NOT just scanned (since we just processed the entered phone number, NOT a card)
      setCardScanned(false);
    } else {
      // Save blank address since there was an error
      setAddress('');
      setZeroEtherBalance();
    }
    // Update redux phoneNumber regardless
    setPhoneNumber(phoneNumber ? phoneNumber : '');
  }
  render() {
    const {phoneNumber} = this.props;
    return (
      <div>
        {/* Text input */}
        <Phone
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={this.handlePhoneChange}
        />
      </div>
    );
  }
}

Textbox.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  loadEtherBalance: PropTypes.func.isRequired,
  setZeroEtherBalance: PropTypes.func.isRequired
};

export default connect(
  state => ({
    phoneNumber: state.identityInfo.phoneNumber
  }),
  dispatch => ({
    setCardScanned: bindActionCreators(identityInfoActions.setCardScanned, dispatch),
    setPhoneNumber: bindActionCreators(identityInfoActions.setPhoneNumber, dispatch),
    setAddress: bindActionCreators(identityInfoActions.setAddress, dispatch),
    setLoading: bindActionCreators(identityInfoActions.setLoading, dispatch),
    loadEtherBalance: bindActionCreators(identityInfoActions.loadEtherBalance, dispatch),
    setZeroEtherBalance: bindActionCreators(identityInfoActions.setZeroEtherBalance, dispatch)
  })
)(Textbox);
