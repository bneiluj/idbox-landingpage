/*
 * This component is used to outline the user's selections and show the user how to send the funds
 */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NumericInput from 'react-numeric-input';
import './SendDialog.css';
import * as sendDialogActions from '../../actions/sendDialog';

export class SendDialog extends Component { // Component is exported for testing without being connected to Redux
  render() {
    const {donateDirectly, financeServices, selectedService, selectedCountry, selectedVillage, villages, ethAmount, setEthAmount} = this.props;

    return (
      <div className="SendDialog">
        <div className="SendDialog-listWrap col-sm-6 bg-master-lightest">
          {/* Summarize the user's action (depending on funding type) */}
          {donateDirectly &&
            <h2>Send ETH to {selectedVillage} in {selectedCountry}</h2>
          }
          {financeServices &&
            <h2>Send {selectedService} to {selectedVillage} in {selectedCountry}</h2>
          }
          <ul className="SendDialog-ul">
            {/* Show the address for the user to deposit the funds into */}
            <li>Deposit Address: {villages[selectedVillage].address}</li>
            {/* Provide an input for the user to input the donation amount */}
            <li>Amount: <NumericInput min={0} precision={8} step={0.1} value={ethAmount} onChange={setEthAmount} /></li>
            {/* Show the user a quantitative measurement of the impact of their donation */}
            {/* NOTE: all of these measurements are just contrived examples, we need to update these with real measurements... */}
            {donateDirectly &&
              <li>Per Person: {Math.round((ethAmount / villages[selectedVillage].population) * 100000000) / 100000000} ETH</li>
            }
            {(selectedService.toLowerCase() === 'power') &&
              <li>kWh: {(ethAmount * 1200)/0.12}</li>
            }
            {(selectedService.toLowerCase() === 'food') &&
              <li>Meals: {(ethAmount * 1200)/3.00}</li>
            }
            {(selectedService.toLowerCase() === 'water') &&
              <li>Litres: {(ethAmount * 1200)/0.50}</li>
            }
            {(selectedService.toLowerCase() === 'internet') &&
              <li>Megabytes: {(ethAmount * 1200)/0.05}</li>
            }
            {(selectedService.toLowerCase() === 'medical') &&
              <li>Some Measurement: {(ethAmount * 1200)}</li>
            }
          </ul>
        </div>
      </div>
    );
  }
}

SendDialog.propTypes = {
  donateDirectly: PropTypes.bool.isRequired,
  financeServices: PropTypes.bool.isRequired,
  selectedService: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string.isRequired,
  selectedVillage: PropTypes.string.isRequired,
  villages: PropTypes.object.isRequired,
  ethAmount: PropTypes.number.isRequired,
  setEthAmount: PropTypes.func.isRequired
};

export default connect(
  state => ({
    donateDirectly: state.fundingType.donateDirectly,
    financeServices: state.fundingType.financeServices,
    selectedService: state.services.selectedService,
    selectedCountry: state.countriesAndVillages.selectedCountry,
    selectedVillage: state.countriesAndVillages.selectedVillage,
    villages: state.countriesAndVillages.villages,
    ethAmount: state.sendDialog.ethAmount
  }),
  dispatch => ({
    setEthAmount: bindActionCreators(sendDialogActions.setEthAmount, dispatch)
  })
)(SendDialog);
