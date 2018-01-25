/*
 * This component is used pick the village the user would like to support in the selected country
 */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './VillageSelect.css';
import * as countriesAndVillagesActions from '../../actions/countriesAndVillages';

export class VillageSelect extends Component { // Component is exported for testing without being connected to Redux
  render() {
    const {villages, setSelectedVillage} = this.props;

    return (
      <div>
        <div className="col-sm-6 col-sm-offset-3 bg-master-lightest p-t-10">
          <h2>Countries</h2>
          <ul className="no-style">
            {Object.keys(villages).map((name, i) => ( // Loop over all villages
              <li className="m-t-5 m-b-5" key={i}><Link to="/SendDialog" onClick={() => setSelectedVillage(name)}>{name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

VillageSelect.propTypes = {
  villages: PropTypes.object.isRequired,
  setSelectedVillage: PropTypes.func.isRequired
};

export default connect(
  state => ({
    villages: state.countriesAndVillages.villages
  }),
  dispatch => ({
    setSelectedVillage: bindActionCreators(countriesAndVillagesActions.setSelectedVillage, dispatch)
  })
)(VillageSelect);
