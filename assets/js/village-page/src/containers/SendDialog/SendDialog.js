/*
 * This component is used to outline the user's selections and show the user how to send the funds
 */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NumericInput from 'react-numeric-input';
import {Link} from 'react-router-dom';
import './SendDialog.css';
import * as sendDialogActions from '../../actions/sendDialog';
import getWeb3 from '../../utils/getWeb3';
import web3Exists from '../../utils/web3Exists';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

const web3Enabled = web3Exists();

export class SendDialog extends Component { // Component is exported for testing without being connected to Redux
  componentWillMount() {
    const {loadEtherUSDRate, setTransactionProcessing, setTransactionError, setTransactionHash} = this.props;

    // When this component first mounts, we need to load in the current ETH price in USD
    loadEtherUSDRate();

    // Mark all sendDialog flags to default values (in cause this is the second donation being made)
    setTransactionProcessing(false); // Mark the transaction as not currently processing
    setTransactionError(false); // Mark transaction as not having had an error yet
    setTransactionHash(''); // Save the transaction hash (as an empty string) to Redux since there is no transaction yet
  }
  handleSend = () => {
    const {selectedVillageData, ethAmount, setTransactionProcessing, setTransactionHash, setTransactionError} = this.props;

    // Send the transaction
    getWeb3(Web3 => {
      Web3.eth.sendTransaction({
        from: Web3.eth.defaultAccount,
        to: selectedVillageData.address,
        value: ethAmount * 1000000000000000000 // In Wei
      }, () => {
        setTransactionProcessing(true); // Mark the transaction as currently processing
        setTransactionError(false); // Mark transaction as not having had an error
        setTransactionHash(''); // Save the transaction hash (as an empty string) to Redux while the transaction gets confrimed
      }).on('confirmation', (confirmationNumber, receipt) => {
        // If we've waited 7 confirmations, we can be confident about the transaction...
        if (confirmationNumber >= 7) {
          setTransactionHash(receipt.transactionHash); // Save the transaction hash to Redux
          setTransactionProcessing(false); // Mark the transaction as no longer processing
        }
      }).on('error', err => {
        setTransactionProcessing(false); // Mark the transaction as no longer processing
        setTransactionError(true); // Mark transaction as having had an error
        // Now, we print the errors to the developer console...
        console.error('There was an error confirming the transaction:');
        console.error(err);
      });
    });
  }
  render() {
    const {donateDirectly, financeServices, selectedServiceData, selectedCountryName,
           selectedVillageName, selectedVillageData, ethAmount, setEthAmount, etherUSDRate,
           transactionProcessing, transactionHash, transactionError, networkType} = this.props;

    const connectedToRinkeby = (networkType.toLowerCase() === 'rinkeby');
    return (
      <div className="col-sm-12 relative">
        <div className="col-sm-6 p-b-20">
          {/* Summarize the user's action (depending on funding type) */}
          {donateDirectly &&
            <h2 className="m-t-0">Send ETH to {capitalizeFirstLetter(selectedVillageName)} in {selectedCountryName}</h2>
          }
          {financeServices &&
            <h2 className="m-t-0">Send {selectedServiceData.name} to {capitalizeFirstLetter(selectedVillageName)} in {selectedCountryName}</h2>
          }
          {/* Back button */}
          <div className="p-t-20 pull-bottom">
            <Link to={donateDirectly ? '/VillageSelect' : '/ServicesSelect'}>&#8592; Back</Link>
          </div>
        </div>
        <div className="col-sm-6 bg-master-lightest md-p-l-0 md-p-r-0">
          <div className="p-l-20 p-r-20 p-t-20 p-b-20">
            <ul className="no-style">
              {/* Show the address for the user to deposit the funds into (if they're on the Rinkeby testnet, otherwise show error)
                * NOTE: We don't even bother showing them the deposit address or Rinkeby network error if their browser isn't web3 enabled!
                */}
              {(!web3Enabled) && // Explain that the browser has to be web3 enabled if it's not
                <li className="m-t-5 m-b-5 text-danger semi-bold">
                  Your browser is not Web3 enabled, please <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">install MetaMask</a> to donate.
                </li>
              }
              {(connectedToRinkeby && web3Enabled) &&
                <li className="m-t-5 m-b-5 overflow-ellipsis">
                  Deposit address: {selectedVillageData.address}
                </li>
              }
              {(!connectedToRinkeby && web3Enabled) &&
                <li className="m-t-5 m-b-5 text-danger semi-bold">
                  Please <a target="_blank" rel="noopener noreferrer" href="https://ethereum.stackexchange.com/a/23732/18312">connect to the Rinkeby Test Network through MetaMask</a> to donate.
                </li>
              }
              {/* Provide an input for the user to input the donation amount */}
              <li className="m-t-5 m-b-5">
                Amount: <NumericInput min={0} precision={8} step={0.1} value={ethAmount} onChange={setEthAmount} />
              </li>
              {/* Show the user a quantitative measurement of the impact of their donation */}
              {/* NOTE: all of these measurements are just contrived examples, we need to update these with real measurements... */}
              {donateDirectly &&
                <li className="m-t-5 m-b-5">
                  Per person: {Math.round((ethAmount / selectedVillageData.population) * 100000000) / 100000000} ETH 
                  (${Math.round((ethAmount / selectedVillageData.population) * etherUSDRate * 100) / 100})
                </li>
              }
              {financeServices &&
                <li className="m-t-5 m-b-5">
                  Cost {selectedServiceData.currencyDesc}: {Math.round((selectedServiceData.cost / etherUSDRate) * 100000000) / 100000000} ETH (${selectedServiceData.cost})
                </li>
              }
              {financeServices &&
                <li className="m-t-5 m-b-5">
                  Amount of units: {Math.floor((ethAmount * etherUSDRate) / selectedServiceData.cost)}
                </li>
              }
              {transactionProcessing &&
                <li className="m-t-5 m-b-5 text-primary semi-bold">
                  Please wait while your transaction gets confirmed...
                </li>
              }
              {(transactionHash.length > 0) &&
                <li className="m-t-5 m-b-5 text-success semi-bold">
                  Thank you! Your <a href={'https://rinkeby.etherscan.io/tx/' + transactionHash} target="_blank" rel="noopener noreferrer">transaction</a> has been confirmed.
                </li>
              }
              {transactionError &&
                <li className="m-t-5 m-b-5 text-danger semi-bold">
                  There was an error confirming your transaction!
                </li>
              }
              {(web3Enabled && connectedToRinkeby && ethAmount > 0) && // Only show the send button if they're willing to donate more than zero (and they have a web3 enabled browser connected to Rinkeby)
                <button onClick={this.handleSend} className='btn btn-cons m-t-10 btn-info xs-no-margin'>
                  Send
                </button>
              }
            </ul>
          </div>
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
  etherUSDRate: PropTypes.number.isRequired,
  setTransactionProcessing: PropTypes.func.isRequired,
  setTransactionHash: PropTypes.func.isRequired,
  transactionProcessing: PropTypes.bool.isRequired,
  transactionHash: PropTypes.string.isRequired,
  setTransactionError: PropTypes.func.isRequired,
  transactionError: PropTypes.bool.isRequired,
  networkType: PropTypes.string.isRequired // (This is set in the App container, that way it is already loaded)
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
    etherUSDRate: state.sendDialog.etherUSDRate,
    transactionProcessing: state.sendDialog.transactionProcessing,
    transactionHash: state.sendDialog.transactionHash,
    transactionError: state.sendDialog.transactionError,
    networkType: state.sendDialog.networkType
  }),
  dispatch => ({
    setEthAmount: bindActionCreators(sendDialogActions.setEthAmount, dispatch),
    loadEtherUSDRate: bindActionCreators(sendDialogActions.loadEtherUSDRate, dispatch),
    setTransactionProcessing: bindActionCreators(sendDialogActions.setTransactionProcessing, dispatch),
    setTransactionHash: bindActionCreators(sendDialogActions.setTransactionHash, dispatch),
    setTransactionError: bindActionCreators(sendDialogActions.setTransactionError, dispatch)
  })
)(SendDialog);
