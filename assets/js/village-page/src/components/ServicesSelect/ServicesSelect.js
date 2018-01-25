/*
 * This component is used to pick the service the user would like to finance
 */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './ServicesSelect.css';
import * as servicesActions from '../../actions/services';

export class ServicesSelect extends Component { // Component is exported for testing without being connected to Redux
  render() {
    const {setSelectedService} = this.props;

    const services = ['Power', 'Food', 'Water', 'Internet', 'Medical']; // A hard-coded list of available services
    return (
      <div className="ServicesSelect">
        <div className="ServicesSelect-listWrap col-sm-6 bg-master-lightest">
          <h2>Services</h2>
          <ul className="ServicesSelect-ul">
            {services.map((name, i) => ( // Loop over the available services
              <li key={i}><Link to="/CountriesSelect" onClick={() => setSelectedService(name)}>{name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ServicesSelect.propTypes = {
  setSelectedService: PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({
    setSelectedService: bindActionCreators(servicesActions.setSelectedService, dispatch)
  })
)(ServicesSelect);