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

export class CountriesSelect extends Component { // Component is exported for testing without being connected to Redux
  render() {
    const {countries, setSelectedCountry} = this.props;

    return (
      <div className="CountriesSelect">
        <div className="CountriesSelect-listWrap col-sm-6 bg-master-lightest">
          <h2>Countries</h2>
          <ul className="CountriesSelect-ul">
            {countries.map((name, i) => ( // Loop over all countries
              <li key={i}><Link to="/VillageSelect" onClick={() => setSelectedCountry(name)}>{name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  countries: PropTypes.array.isRequired,
  setSelectedCountry: PropTypes.func.isRequired
};

export default connect(
  state => ({
    countries: state.countriesAndVillages.countries
  }),
  dispatch => ({
    setSelectedCountry: bindActionCreators(countriesAndVillagesActions.setSelectedCountry, dispatch)
  })
)(CountriesSelect);
