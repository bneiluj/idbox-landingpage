import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Phone, {isValidPhoneNumber} from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import * as textboxActions from '../../actions/textbox';
import web3 from '../../utils/web3';

let IDBoxVillageContract;

export class Textbox extends Component { // Component is exported for testing without being connected to Redux
  componentDidMount() {
    // First we create an instance of the contract
    IDBoxVillageContract = new web3.eth.Contract(
      '', // < -- NEEDS ABI OF DEPLOYED CONTRACT
      '' // < -- NEEDS CONTRACT ADDRESS
      // {
      //   from: coinbase
      // }
    );
  }
  handlePhoneChange = phoneNumber => {
    const {setPhoneNumber, setPhoneExists} = this.props;
    // Check if the number is a complete, valid phone number
    if (isValidPhoneNumber(phoneNumber)){
      // Since the phone number is valid, we call method of smart contract
      // NOTE: METHOD NAME BELOW NEEDS TO BE UPDATED ("phoneNumberExists" is a placeholder for the method name)
      IDBoxVillageContract.methods.phoneNumberExists(phoneNumber).call().then(validOrNot => {
        return setPhoneExists(validOrNot);
      }, err => {
        console.error('There was an error calling the smart contract:');
        return console.error(err);
      });
    }
    // Update redux phoneNumber regardless
    setPhoneNumber(phoneNumber);
  }
  render() {
    const {phoneNumber, phoneExists} = this.props;
    console.log(isValidPhoneNumber(phoneNumber));
    return (
      <div>
        {/* Text input */}
        <Phone
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={this.handlePhoneChange}
        />
        {/* Print if the phone number is valid or not */}
        {(isValidPhoneNumber(phoneNumber)) &&
          <h2 className='m-b-0'>{phoneExists ? 'Valid phone number!' : 'Invalid phone number!'}</h2>
        }
      </div>
    );
  }
}

Textbox.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  phoneExists: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    phoneNumber: state.textbox.phoneNumber,
    phoneExists: state.textbox.phoneExists
  }),
  dispatch => ({
    setPhoneNumber: bindActionCreators(textboxActions.setPhoneNumber, dispatch),
    setPhoneExists: bindActionCreators(textboxActions.setPhoneExists, dispatch)
  })
)(Textbox);
