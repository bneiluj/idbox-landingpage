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
      <div className="col-sm-8 col-sm-offset-2 bg-master-lightest no-padding">
        <div className="p-l-20 p-r-20 p-t-20 p-b-20">
          <h2 className="m-t-0">Services</h2>
          <div className="col-sm-12 p-b-20 clearfix">
            {selectedVillageData.services.map((service, i) => { // Loop over the available services
              // Replace spaces ( ) with dashes (-) in the service name to get the image's path
              const iconImgName = service.name.replace(/ /g, '-');
              let iconPath;
              // TODO: once the website react code is refactored, simply accessing these icons...
              if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                // If we're in development, use the icons inside the ServicesSelect directory (because can't access files outside "src")
                iconPath = require('./serviceIcons/' + iconImgName + '.png');
              } else {
                // If in production, use the icons located in the "/assets/images" folder
                iconPath = '/assets/images/serviceIcons/' + iconImgName + '.png';
              }
              return (
                <div className="col-xs-4 p-l-5 p-r-5" key={i}>
                  <Link to="/SendDialog" onClick={() => setSelectedServiceData(service)}>
                    <div><img src={iconPath} className="full-width" alt="logo" /></div>
                    <div>{service.name}</div>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* Back button */}
          <div className="p-b-10">
            <Link to="/VillageSelect">&#8592; Back</Link>
          </div>
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
