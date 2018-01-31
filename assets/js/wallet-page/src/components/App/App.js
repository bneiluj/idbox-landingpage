import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './App.css';
import Scanner from '../Scanner/Scanner';
import Textbox from '../Textbox/Textbox';
import IdentityInfo from '../IdentityInfo/IdentityInfo';
import getWeb3 from '../../utils/getWeb3';
import * as identityInfoActions from '../../actions/identityInfo';

export class App extends Component { // Component is exported for testing without being connected to Redux
  componentWillMount() {
    getWeb3().then(Web3 => {
      const {setNetworkType} = this.props;

      // Save Ethereum network type to Redux (for later use in SendDialog)
      Web3.eth.net.getNetworkType().then(setNetworkType);
    }, err => console.error);
  }
  render() {
    const {cardScanned, phoneNumber} = this.props;

    return (
      <div className="App">
        {/* Scanner wrap */}
        <div className="App-leftSubSection App-subSection">
          <div className="App-sectionInnerWrapper">
            <h2 className='m-b-15'>Scan Card</h2>
            {/* Scanner component */}
            <Scanner />
            {/* Show identity information (only displayed if the card was just scanned) */}
            {cardScanned &&
              <IdentityInfo />
            }
          </div>
        </div>
        {/* Textbox wrap */}
        <div className="App-rightSubSection App-subSection">
          <div className="App-sectionInnerWrapper">
            <h2 className='m-b-15'>Enter Phone Number</h2>
            {/* Textbox component */}
            <Textbox />
            {/* Show identity information (only displayed if the phone number was just entered) */}
            {(!cardScanned && phoneNumber && phoneNumber.length > 0) &&
              <IdentityInfo />
            }
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  cardScanned: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setNetworkType: PropTypes.func.isRequired
};

export default connect(
  state => ({
    cardScanned: state.identityInfo.cardScanned,
    address: state.identityInfo.address,
    phoneNumber: state.identityInfo.phoneNumber
  }),
  dispatch => ({
    setNetworkType: bindActionCreators(identityInfoActions.setNetworkType, dispatch)
  })
)(App);
