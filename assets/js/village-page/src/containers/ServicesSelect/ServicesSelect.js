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
    const {setSelectedServiceData, selectedVillageData} = this.props;

    return (
      <div>
        <div className="col-sm-6 col-sm-offset-3 bg-master-lightest p-t-10">
          <h2>Services</h2>
          <ul className="no-style">
            {selectedVillageData.services.map((service, i) => ( // Loop over the available services
              <li className="m-t-5 m-b-5" key={i}><Link to="/SendDialog" onClick={() => setSelectedServiceData(service)}>{service.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ServicesSelect.propTypes = {
  setSelectedServiceData: PropTypes.func.isRequired,
  selectedVillageData: PropTypes.object.isRequired
};

export default connect(
  state => ({
    selectedVillageData: state.countriesAndVillages.selectedVillageData
  }),
  dispatch => ({
    setSelectedServiceData: bindActionCreators(servicesActions.setSelectedServiceData, dispatch)
  })
)(ServicesSelect);
