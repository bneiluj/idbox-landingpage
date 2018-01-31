import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Router, Route} from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import {FundingTypeSelect, ServicesSelect, CountriesSelect, VillageSelect, SendDialog} from '../';
import getWeb3 from '../../utils/getWeb3';
import IdBoxABI from '../../constants/contracts/Idbox.json';
import * as sendDialogActions from '../../actions/sendDialog';
import * as countriesAndVillagesActions from '../../actions/countriesAndVillages';
import './App.css';

export class App extends Component {
  componentWillMount() {
    getWeb3(Web3 => {
      const {setNetworkType} = this.props;

      // Subscribe to smart-contract "NewIdboxId" event (and update population on change)
      const  IdBoxContract = Web3.eth.contract(IdBoxABI.abi);
      const idBoxInstance = IdBoxContract.at('0x676f9bb76cc6b14be31d6c31b3712eb4cd4d665a');
      Web3.eth.getBlockNumber((blockNumError, blockNum) => { // Get the current block (at the time of page load)
        if (blockNumError) {
          return console.error(blockNumError);
        }
        // Now, we listen for any events that come after the initial block
        idBoxInstance.allEvents({fromBlock: blockNum}).watch((error, result) => {
          if (error) {
            return console.error(error);
          }
          // Now, we check if was a "NewIdboxUserEvent" event
          if (result.event === 'NewIdboxUserEvent') {
            this.incrementJordanCampInVillages();
          }
        });
      });
      // For old Web3 v-1.0 implementation:
      // idBoxContract.events.NewIdboxId((error, event) => {
      //   console.log(error);
      //   console.log(event);
      //   // Need to connect to redux to update population (and maybe highlight pin?) ...
      // });

      // Save Ethereum network type to Redux (for later use in SendDialog)
      // For old Web3 v-1.0 implementation:
      // Web3.eth.net.getNetworkType().then(setNetworkType);
      setNetworkType(parseInt(Web3.version.network, 10));
    });
  }
  incrementJordanCampInVillages = () => {
    // NOTE: For now, we're just hard-coding a manual incrementation of one of the camp in Jordan's population
    //       inside of Redux, however in the future the smart-contract event will need to provide information
    //       about the village/camp of the user who was just added...
    const {setVillages, villages} = this.props;

    const newVillagesArray = [];
    for (let i = 0; i < villages.length; ++i) {
      if (villages[i].name === "Za'atari Refugee camp") {
        // This is the camp we're looking for, so we increment the population
        newVillagesArray.push({
          ...(villages[i]),
          population: (villages[i].population + 1)
        });
      } else {
        // Not the camp we're looking for, so just add it back to the villages
        newVillagesArray.push(villages[i]);
      }
      if (i === villages.length - 1) { // Last iteration
        setVillages(newVillagesArray);
      }
    }
  }
  // We create a memory history to prevent the URL from changing when we move between different routes
  history = createMemoryHistory({
    initialEntries: ['/FundingTypeSelect'] // The initial URL in the history stack
  });
  render() {
    return (
      <Router history={this.history}>
        <div className="m-t-50 m-b-50 clearfix">
          {/* FundingTypeSelect is used to pick the method of funding (direct or services) */}
          <Route exact path="/FundingTypeSelect" component={FundingTypeSelect} />
          {/* ServicesSelect is used to pick the service the user would like to finance */}
          <Route path="/ServicesSelect" component={ServicesSelect} />
          {/* CountriesSelect is used pick the country the user would like to support */}
          <Route path="/CountriesSelect" component={CountriesSelect} />
          {/* VillageSelect is used pick the village the user would like to support in the selected country */}
          <Route path="/VillageSelect" component={VillageSelect} />
          {/* SendDialog is used to outline the user's selections and show the user how to send the funds */}
          <Route path="/SendDialog" component={SendDialog} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  setNetworkType: PropTypes.func.isRequired,
  villages: PropTypes.array.isRequired,
  setVillages: PropTypes.func.isRequired
};

export default connect(
  state => ({
    villages: state.countriesAndVillages.villages
  }),
  dispatch => ({
    setNetworkType: bindActionCreators(sendDialogActions.setNetworkType, dispatch),
    setVillages: bindActionCreators(countriesAndVillagesActions.setVillages, dispatch)
  })
)(App);
