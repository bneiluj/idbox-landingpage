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
import countriesJson from '../../constants/countries.json';

export class VillageSelect extends Component { // Component is exported for testing without being connected to Redux
  handleVillageSelect = name => { // This function handles the event of the user clicking on a village from the list
    const {setSelectedVillageData, setSelectedVillageName, selectedCountryName} = this.props;

    // Set the name of the selected village
    setSelectedVillageName(name);

    // Set the data for the selected village
    // NOTE: In the future, this will be a call to the SC/swarm (hard-coded JSON for now)
    setSelectedVillageData(countriesJson[selectedCountryName]['location'][name]);
  }
  render() {
    const {villages, financeServices} = this.props;

    return (
      <div>
        <div className="col-sm-6 col-sm-offset-3 bg-master-lightest p-t-10">
          <h2>Countries</h2>
          <ul className="no-style">
            {villages.map((name, i) => ( // Loop over all villages
              // NOTE: We link to the ServicesSelect route next if the user picked services and
              //       we link to the SendDialog route next if the user picked direct donation
              <li className="m-t-5 m-b-5" key={i}><Link to={financeServices ? "/ServicesSelect" : "/SendDialog"} onClick={() => this.handleVillageSelect(name)}>{name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

VillageSelect.propTypes = {
  villages: PropTypes.array.isRequired,
  setSelectedVillageName: PropTypes.func.isRequired,
  selectedCountryName: PropTypes.string.isRequired,
  setSelectedVillageData: PropTypes.func.isRequired,
  financeServices: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    villages: state.countriesAndVillages.villages,
    selectedCountryName: state.countriesAndVillages.selectedCountryName,
    financeServices: state.fundingType.financeServices
  }),
  dispatch => ({
    setSelectedVillageName: bindActionCreators(countriesAndVillagesActions.setSelectedVillageName, dispatch),
    setSelectedVillageData: bindActionCreators(countriesAndVillagesActions.setSelectedVillageData, dispatch)
  })
)(VillageSelect);
