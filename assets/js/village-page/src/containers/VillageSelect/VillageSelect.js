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
import {IdboxMap} from '../../components';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

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
    const {villages, financeServices, villageGeoLocations, donateDirectly} = this.props;

    return (
      <div className="VillageSelect-minHeightList full-height bg-master-lightest">
        <div className="VillageSelect-minHeightList col-sm-5 no-padding relative">
          <div className="p-l-20 p-r-20 p-t-20 p-b-20">
            {donateDirectly &&
              <h5 className="block-title hint-text no-margin">Donate Directly</h5>
            }
            {(!donateDirectly) &&
              <h5 className="block-title hint-text no-margin">Finance Services</h5>
            }
            <h2 className="m-l-0 m-r-0 m-t-0 m-b-0 p-b-10">Villages &amp; Camps</h2>
            <ul className="no-style p-b-5">
              <li className="m-t-5 m-b-5 clearfix">
                <div className="col-xs-3 md-p-l-0 md-p-l-0">
                  Name
                </div>
                {/* TODO: once the website react code is refactored, simplify accessing these icons... */}
                <div className="col-xs-3 md-p-l-0 md-p-l-0 text-center">
                  <img className="VillageSelect-popIcon full-width" src={(process.env.NODE_ENV === 'development') ? require('./populationIcons/population.svg') : '/assets/images/populationIcons/population.svg'} alt="" />
                </div>
                <div className="col-xs-3 md-p-l-0 md-p-l-0 text-center">
                  <img className="VillageSelect-womenChildrenIcon full-width" src={(process.env.NODE_ENV === 'development') ? require('./populationIcons/women.svg') : '/assets/images/populationIcons/women.svg'} alt="" />
                </div>
                <div className="col-xs-3 md-p-l-0 md-p-l-0 text-center">
                  <img className="VillageSelect-womenChildrenIcon full-width" src={(process.env.NODE_ENV === 'development') ? require('./populationIcons/children.svg') : '/assets/images/populationIcons/children.svg'} alt="" />
                </div>
              </li>
              {villages.map((village, i) => ( // Loop over all villages
                // NOTE: We link to the ServicesSelect route next if the user picked services and
                //       we link to the SendDialog route next if the user picked direct donation
                <li className="m-t-5 m-b-5 clearfix" key={i}>
                  <div className="col-xs-3 md-p-l-0 md-p-l-0">
                    <Link
                      to={financeServices ? "/ServicesSelect" : "/SendDialog"}
                      onClick={() => this.handleVillageSelect(village.name)}
                    >
                      {capitalizeFirstLetter(village.name)}
                    </Link>
                  </div>
                  <div className="col-xs-3 md-p-l-0 md-p-l-0 text-center">{village.population}</div>
                  <div className="col-xs-3 md-p-l-0 md-p-l-0 text-center">{village.women}</div>
                  <div className="col-xs-3 md-p-l-0 md-p-l-0 text-center">{village.children}</div>
                </li>
              ))}
            </ul>
            {/* Back button */}
            <div className="pull-bottom p-b-10">
              <Link to="/CountriesSelect">&#8592; Back</Link>
            </div>
          </div>
        </div>
        <div className="col-sm-7 no-padding VillageSelect-minHeight VillageSelect-childrenMinHeight">
          {(villageGeoLocations.length > 0) &&
            <IdboxMap markerLocations={villageGeoLocations} zoom={7} />
          }
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
  financeServices: PropTypes.bool.isRequired,
  villageGeoLocations: PropTypes.array.isRequired,
  donateDirectly: PropTypes.bool.isRequired
};

export default connect(
  state => ({
    villages: state.countriesAndVillages.villages,
    selectedCountryName: state.countriesAndVillages.selectedCountryName,
    financeServices: state.fundingType.financeServices,
    villageGeoLocations: state.countriesAndVillages.villageGeoLocations,
    donateDirectly: state.fundingType.donateDirectly
  }),
  dispatch => ({
    setSelectedVillageName: bindActionCreators(countriesAndVillagesActions.setSelectedVillageName, dispatch),
    setSelectedVillageData: bindActionCreators(countriesAndVillagesActions.setSelectedVillageData, dispatch)
  })
)(VillageSelect);
