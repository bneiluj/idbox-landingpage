import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import {FundingTypeSelect, ServicesSelect, CountriesSelect} from '../';
import './App.css';

export default class App extends Component {
  // We create a memory history to prevent the URL from changing when we move between different routes
  history = createMemoryHistory({
    initialEntries: ['/FundingTypeSelect'] // The initial URL in the history stack
  });
  render() {
    return (
      <Router history={this.history}>
        <div className="App">
          <Route exact path="/FundingTypeSelect" component={FundingTypeSelect} />
          <Route path="/ServicesSelect" component={ServicesSelect} />
          <Route path="/CountriesSelect" component={CountriesSelect} />
        </div>
      </Router>
    );
  }
}
