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
    const {setCountries, countries, addCountryGeoLocation, countryGeoLocations} = this.props;

    const countryNames = Object.keys(countriesJson);

    // If we haven't got the countries data yet, we need to fetch it...
    if (countries.length === 0) {
      // NOTE: In the future, this will be a call to the SC/swarm (hard-coded JSON for now)
      setCountries(countryNames);
    }

    // If we haven't got the country geo locations (lat/long for each country) yet, we need to fetch them...
    if (countryGeoLocations.length === 0) {
      // First we loop over all of the countries
      for (let i = 0; i < countryNames.length; ++i) {
        addCountryGeoLocation(countryNames[i]);
      }
    }
  }
  handleCountrySelect = name => { // This function handles the event of the user clicking on a country from the list
    const {setVillages, setSelectedCountryName, setVillageGeoLocations} = this.props;

    // Set the name of the selected village
    setSelectedCountryName(name);

    // Set the villages/camps located in the selected country
    // NOTE: In the future, this will be a call to the SC/swarm (hard-coded JSON for now)
    setVillages(Object.keys(countriesJson[name].location));

    // We need to fetch the village geo locations (lat/long for each village)...
    const villageGeoLocations = [];
    const villageNames = Object.keys(countriesJson[name].location);
    // console.log(villageNames);
    for (let i = 0; i < villageNames.length; ++i) { // First we loop over all of the countries
      // console.log(countriesJson[name].location);
      const coordinates = countriesJson[name].location[villageNames[i]].coordinates.split(',');
      const lat = parseFloat(coordinates[0].trim(), 10);
      const lng = parseFloat(coordinates[1].trim(), 10);
      villageGeoLocations.push({
        name: villageNames[i],
        lat,
        lng
      });
    }
    setVillageGeoLocations(villageGeoLocations); // Save village locations in Redux
  }
  render() {
    const {countries, countryGeoLocations} = this.props;

    return (
      <div className="CountriesSelect-displayFlex full-height">
        <div className="col-sm-5 bg-master-lightest no-padding">
          <div className="m-l-20 m-r-20 m-t-20 m-b-20">
            <h2>Countries</h2>
            <ul className="no-style">
              {countries.map((name, i) => ( // Loop over all countries
                <li className="m-t-5 m-b-5" key={i}><Link to="/VillageSelect" onClick={() => this.handleCountrySelect(name)}>{name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-sm-7 no-padding CountriesSelect-childrenFullHeight">
          {/* NOTE: We have to wait to load the map, because if we load it before all of the data
            *       is in, the center point won't be calculated correctly (the map won't be centered)
            */}
          {(countryGeoLocations.length === Object.keys(countriesJson).length) &&
            <IdboxMap markerLocations={countryGeoLocations} zoom={2} />
          }
        </div>
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  setSelectedCountryName: PropTypes.func.isRequired,
  setCountries: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  setVillages: PropTypes.func.isRequired,
  addCountryGeoLocation: PropTypes.func.isRequired,
  countryGeoLocations: PropTypes.array.isRequired,
  setVillageGeoLocations: PropTypes.func.isRequired
};

export default connect(
  state => ({
    countries: state.countriesAndVillages.countries,
    countryGeoLocations: state.countriesAndVillages.countryGeoLocations
  }),
  dispatch => ({
    setSelectedCountryName: bindActionCreators(countriesAndVillagesActions.setSelectedCountryName, dispatch),
    setCountries: bindActionCreators(countriesAndVillagesActions.setCountries, dispatch),
    setVillages: bindActionCreators(countriesAndVillagesActions.setVillages, dispatch),
    addCountryGeoLocation: bindActionCreators(countriesAndVillagesActions.addCountryGeoLocation, dispatch),
    setVillageGeoLocations: bindActionCreators(countriesAndVillagesActions.setVillageGeoLocations, dispatch)
  })
)(CountriesSelect);
