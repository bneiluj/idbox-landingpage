/*
 * This component is used to pick the country the user would like to support
 */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './CountriesSelect.css';
import * as countriesAndVillagesActions from '../../actions/countriesAndVillages';
import countriesJson from '../../constants/countries.json';
import {IdboxMap} from '../../components';

export class CountriesSelect extends Component { // Component is exported for testing without being connected to Redux
  componentWillMount() {
    const {setCountries, countries} = this.props;

    // If we haven't got the countries data yet, we need to fetch it...
    if (countries.length === 0) {
      // NOTE: In the future, this will be a call to the SC/swarm (hard-coded JSON for now)
      setCountries(Object.keys(countriesJson));
    }
  }
  handleCountrySelect = name => { // This function handles the event of the user clicking on a country from the list
    const {setVillages, setSelectedCountryName} = this.props;

    // Set the name of the selected village
    setSelectedCountryName(name);

    // Set the villages/camps located in the selected country
    // NOTE: In the future, this will be a call to the SC/swarm (hard-coded JSON for now)
    setVillages(Object.keys(countriesJson[name]['location']));
  }
  render() {
    const {countries} = this.props;

    // NOTE: This data needs to come from the JSON (this is temporary)
    const countryLocations = [
      {name: 'Papua New Guinea', lat: -4.343673, lng: 152.268784},
      {name: 'Jordan', lat: 30.5852, lng: 36.2384},
      {name: 'Kenya', lat: 0.0236, lng: 37.9062}
    ];
    return (
      <div className="CountriesSelect-displayFlex full-height">
        <div className="col-sm-5 bg-master-lightest m-t-10">
          <h2>Countries</h2>
          <ul className="no-style">
            {countries.map((name, i) => ( // Loop over all countries
              <li className="m-t-5 m-b-5" key={i}><Link to="/VillageSelect" onClick={() => this.handleCountrySelect(name)}>{name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="col-sm-7 p-t-10 CountriesSelect-childrenFullHeight">
          <IdboxMap markerLocations={countryLocations} />
        </div>
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  setSelectedCountryName: PropTypes.func.isRequired,
  setCountries: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  setVillages: PropTypes.func.isRequired
};

export default connect(
  state => ({
    countries: state.countriesAndVillages.countries
  }),
  dispatch => ({
    setSelectedCountryName: bindActionCreators(countriesAndVillagesActions.setSelectedCountryName, dispatch),
    setCountries: bindActionCreators(countriesAndVillagesActions.setCountries, dispatch),
    setVillages: bindActionCreators(countriesAndVillagesActions.setVillages, dispatch)
  })
)(CountriesSelect);
