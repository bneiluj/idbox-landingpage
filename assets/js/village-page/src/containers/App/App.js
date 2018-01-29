import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import {FundingTypeSelect, ServicesSelect, CountriesSelect, VillageSelect, SendDialog} from '../';
import getWeb3 from '../../utils/getWeb3';
import IdBoxABI from '../../constants/contracts/Idbox.json';
import './App.css';

export default class App extends Component {
  ComponentWillMount() {
    getWeb3(Web3 => {
      const idBoxContract = new Web3.eth.Contract(IdBoxABI, '0x676f9bb76cc6b14be31d6c31b3712eb4cd4d665a');
      idBoxContract.events.NewIdboxId((error, event) => {
        console.log(error);
        console.log(event);
        // Need to connect to redux to update population (and maybe highlight pin?) ...
      })
    });
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