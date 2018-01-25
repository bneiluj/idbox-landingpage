import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import {FundingTypeSelect, ServicesSelect, CountriesSelect, VillageSelect, SendDialog} from '../';
import './App.css';

export default class App extends Component {
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
