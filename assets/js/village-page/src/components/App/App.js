import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import FundingTypeSelect from '../FundingTypeSelect/FundingTypeSelect';
import ServicesSelect from '../ServicesSelect/ServicesSelect';
import CountriesSelect from '../CountriesSelect/CountriesSelect';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={FundingTypeSelect} />
          <Route path="/services" component={ServicesSelect} />
          <Route path="/countries" component={CountriesSelect} />
        </div>
      </Router>
    );
  }
}
