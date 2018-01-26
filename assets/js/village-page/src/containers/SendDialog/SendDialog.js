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
  componentWillMount() {
    const {loadEtherUSDRate} = this.props;

    // When this component first mounts, we need to load in the current ETH price in USD
    loadEtherUSDRate();
  }
  render() {
    const {donateDirectly, financeServices, selectedServiceData, selectedCountryName, selectedVillageName, selectedVillageData, ethAmount, setEthAmount, etherUSDRate} = this.props;

    return (
      <div>
        <div className="col-sm-6 col-sm-offset-3 bg-master-lightest p-t-10">
          {/* Summarize the user's action (depending on funding type) */}
          {donateDirectly &&
            <h2>Send ETH to {selectedVillageName} in {selectedCountryName}</h2>
          }
          {financeServices &&
            <h2>Send {selectedServiceData.name} to {selectedVillageName} in {selectedCountryName}</h2>
          }
          <ul className="no-style">
            {/* Show the address for the user to deposit the funds into */}
            <li className="m-t-5 m-b-5">Deposit address: {selectedVillageData.address}</li>
            {/* Provide an input for the user to input the donation amount */}
            <li className="m-t-5 m-b-5">Amount: <NumericInput min={0} precision={8} step={0.1} value={ethAmount} onChange={setEthAmount} /></li>
            {/* Show the user a quantitative measurement of the impact of their donation */}
            {/* NOTE: all of these measurements are just contrived examples, we need to update these with real measurements... */}
            {donateDirectly &&
              <li className="m-t-5 m-b-5">Per person: {Math.round((ethAmount / selectedVillageData.population) * 100000000) / 100000000} ETH</li>
            }
            {financeServices &&
              <li className="m-t-5 m-b-5">Cost {selectedServiceData.currencyDesc}: {selectedServiceData.currency}{selectedServiceData.cost}</li>
            }
            {financeServices &&
              <li className="m-t-5 m-b-5">Amount of units: {Math.round((ethAmount * etherUSDRate) / selectedServiceData.cost)}</li>
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
  selectedServiceData: PropTypes.object.isRequired,
  selectedCountryName: PropTypes.string.isRequired,
  selectedVillageName: PropTypes.string.isRequired,
  selectedVillageData: PropTypes.object.isRequired,
  ethAmount: PropTypes.number.isRequired,
  setEthAmount: PropTypes.func.isRequired,
  loadEtherUSDRate: PropTypes.func.isRequired,
  etherUSDRate: PropTypes.number.isRequired
};

export default connect(
  state => ({
    donateDirectly: state.fundingType.donateDirectly,
    financeServices: state.fundingType.financeServices,
    selectedServiceData: state.services.selectedServiceData,
    selectedCountryName: state.countriesAndVillages.selectedCountryName,
    selectedVillageName: state.countriesAndVillages.selectedVillageName,
    selectedVillageData: state.countriesAndVillages.selectedVillageData,
    ethAmount: state.sendDialog.ethAmount,
    etherUSDRate: state.sendDialog.etherUSDRate
  }),
  dispatch => ({
    setEthAmount: bindActionCreators(sendDialogActions.setEthAmount, dispatch),
    loadEtherUSDRate: bindActionCreators(sendDialogActions.loadEtherUSDRate, dispatch)
  })
)(SendDialog);
