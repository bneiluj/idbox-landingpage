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
import countries from '../contants/countries.json';

export class CountriesSelect extends Component { // Component is exported for testing without being connected to Redux
  render() {
    const {setSelectedCountry} = this.props;

    return (
      <div>
        <div className="col-sm-6 col-sm-offset-3 bg-master-lightest p-t-10">
          <h2>Countries</h2>
          <ul className="no-style">
            {Object.keys(countries).map((name, i) => ( // Loop over all countries
              <li className="m-t-5 m-b-5" key={i}><Link to="/VillageSelect" onClick={() => setSelectedCountry(name)}>{name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

CountriesSelect.propTypes = {
  setSelectedCountry: PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({
    setSelectedCountry: bindActionCreators(countriesAndVillagesActions.setSelectedCountry, dispatch)
  })
)(CountriesSelect);
