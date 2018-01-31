import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NumericInput from 'react-numeric-input';
import getWeb3 from '../../utils/getWeb3';
import web3Exists from '../../utils/web3Exists';
import * as identityInfoActions from '../../actions/identityInfo';

const web3Enabled = web3Exists();

export class IdentityInfo extends Component { // Component is exported for testing without being connected to Redux
  componentWillReceiveProps(nextProps) {
    const {weiBalance, loadEtherUSDRate, loadUSDLocalCurrencyRate} = this.props;
    if (weiBalance !== nextProps.weiBalance) { // Check if the wei balance has changed
      loadEtherUSDRate(); // Call API to get the value of one ether in USD
      loadUSDLocalCurrencyRate(); // Call API to get the value of one USD in the user's local currency
    }
  }
  handleSend = () => {
    const {address, ethAmount, setTransactionProcessing, setTransactionError, setTransactionHash} = this.props;

    // Send the transaction
    getWeb3().then(Web3 => {
      Web3.eth.sendTransaction({
        from: Web3.eth.defaultAccount,
        to: address,
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
    }, err => console.error);
  }
  render() {
    const {address, phoneNumber, weiBalance, scanningError, loading, etherUSDRate, USDLocalCurrencyRate, ethAmount, setEthAmount, transactionProcessing, transactionError, transactionHash, networkType} = this.props;

    const showAddress = (!loading && address); // Whether an address exists (to be displayed)
    const showPhoneNumber = (!loading && phoneNumber); // Whether a phone number exists (to be displayed)

    const ethBalance = Math.round((weiBalance / 1000000000000000000) * 100000000) / 100000000; // Rounded to 8 decimal places
    const localCurrencyValue = ethBalance * etherUSDRate * USDLocalCurrencyRate;

    const connectedToRinkeby = (networkType.toLowerCase() === 'rinkeby');

    return (
      <div className="text-left">
        <ul className="no-style md-p-l-0">
          {/* Balance adjusted from Wei to Eth and show the value of the user's ether in their local currency (rounded to two decimal places) */}
          {(!scanningError && showAddress) && // Only show when there isn't an error AND a valid address is being displayed
            <li className="m-t-10 m-b-5 md-p-l-0">Balance: {ethBalance} ETH ({Math.round(localCurrencyValue * 100) / 100} PGK)</li>
          }
          {/* If there is no scanning error, show the address if it exists */}
          {(!scanningError && web3Enabled && connectedToRinkeby) &&
            <li className="m-t-5 m-b-5 md-p-l-0 overflow-ellipsis">Address: {showAddress ? address : 'not found'}</li>
          }
          {/* If there is no scanning error, show the phone number if it exists */}
          {(!scanningError) &&
            <li className="m-t-5 m-b-5 md-p-l-0">Phone Number: {showPhoneNumber ? phoneNumber : 'not found'}</li>
          }
          {/* If the identity is currently loading... */}
          {(!scanningError && loading) &&
            <li className="m-t-5 m-b-5 md-p-l-0">Loading...</li>
          }
          {/* If there was an error scanning the QR code, say so */}
          {scanningError &&
            <li className='m-t-5 m-b-5 md-p-l-0 text-danger semi-bold'>There was an error scanning the QR code!</li>
          }
          {/* Show a message if the MetaMask transaction is currently processing */}
          {(!scanningError && transactionProcessing) &&
            <li className="m-t-5 m-b-5 md-p-l-0 text-primary semi-bold">Please wait while your transaction gets confirmed...</li>
          }
          {/* Show a success message if the MetaMask transaction successfully processed */}
          {(!scanningError && (transactionHash.length > 0)) &&
            <li className="m-t-5 m-b-5 md-p-l-0 text-success semi-bold">Thank you! Your <a href={'https://rinkeby.etherscan.io/tx/' + transactionHash} target="_blank" rel="noopener noreferrer">transaction</a> has been confirmed.</li>
          }
          {/* Show an error if the MetaMask transaction wasn't successfully processed */}
          {(!scanningError && transactionError) &&
            <li className="m-t-5 m-b-5 md-p-l-0 text-danger semi-bold">There was an error confirming your transaction!</li>
          }
          {/* Show an error if the browser isn't web3 enabled */}
          {(!scanningError && !web3Enabled) &&
            <li className="m-t-5 m-b-5 md-p-l-0 text-danger semi-bold">Your browser is not Web3 enabled, please <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">install MetaMask</a> to send ETH!</li>
          }
          {/* Show an error if MetaMask isn't connected to the Rinkeby testnet */}
          {(!scanningError && !connectedToRinkeby && web3Enabled) &&
            <li className="m-t-5 m-b-5 md-p-l-0 text-danger semi-bold">Please <a target="_blank" rel="noopener noreferrer" href="https://ethereum.stackexchange.com/a/23732/18312">connect to the Rinkeby Test Network through MetaMask</a> to send ETH.</li>
          }
          {/* Show a MetaMask-integrated donation input and button (if there are no errors and the user has MetaMask and is on the Rinkeby network) */}
          {(!scanningError && web3Enabled && connectedToRinkeby && showAddress) &&
            <li className="m-t-5 m-b-5 md-p-l-0">
              Amount to Send: <NumericInput min={0} precision={8} step={0.1} value={ethAmount} onChange={setEthAmount} />
            </li>
          }
          {(!scanningError && web3Enabled && connectedToRinkeby && ethAmount > 0) &&
            <li className="m-t-5 m-b-5 md-p-l-0">
              <button onClick={this.handleSend} className='btn btn-cons m-t-5 btn-info xs-no-margin'>Send</button>
            </li>
          }
        </ul>
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
  loadUSDLocalCurrencyRate: PropTypes.func.isRequired,
  setEthAmount: PropTypes.func.isRequired,
  ethAmount: PropTypes.number.isRequired,
  setTransactionProcessing: PropTypes.func.isRequired,
  setTransactionError: PropTypes.func.isRequired,
  setTransactionHash: PropTypes.func.isRequired,
  transactionProcessing: PropTypes.bool.isRequired,
  transactionError: PropTypes.bool.isRequired,
  transactionHash: PropTypes.string.isRequired,
  networkType: PropTypes.string.isRequired // (This is set in the App container, that way it is already loaded)
};

export default connect(
  state => ({
    address: state.identityInfo.address,
    phoneNumber: state.identityInfo.phoneNumber,
    weiBalance: state.identityInfo.weiBalance,
    etherUSDRate: state.identityInfo.etherUSDRate,
    USDLocalCurrencyRate: state.identityInfo.USDLocalCurrencyRate,
    scanningError: state.identityInfo.scanningError,
    loading: state.identityInfo.loading,
    ethAmount: state.identityInfo.ethAmount,
    transactionProcessing: state.identityInfo.transactionProcessing,
    transactionError: state.identityInfo.transactionError,
    transactionHash: state.identityInfo.transactionHash,
    networkType: state.identityInfo.networkType
  }),
  dispatch => ({
    loadEtherUSDRate: bindActionCreators(identityInfoActions.loadEtherUSDRate, dispatch),
    loadUSDLocalCurrencyRate: bindActionCreators(identityInfoActions.loadUSDLocalCurrencyRate, dispatch),
    setEthAmount: bindActionCreators(identityInfoActions.setEthAmount, dispatch),
    setTransactionProcessing: bindActionCreators(identityInfoActions.setTransactionProcessing, dispatch),
    setTransactionError: bindActionCreators(identityInfoActions.setTransactionError, dispatch),
    setTransactionHash: bindActionCreators(identityInfoActions.setTransactionHash, dispatch)
  })
)(IdentityInfo);
