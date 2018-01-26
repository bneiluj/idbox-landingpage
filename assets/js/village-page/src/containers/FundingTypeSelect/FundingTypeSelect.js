/*
 * This component is used to pick the method of funding (direct or services)
 */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './FundingTypeSelect.css';
import * as fundingTypeActions from '../../actions/fundingType';

export class FundingTypeSelect extends Component { // Component is exported for testing without being connected to Redux
  render() {
    const {setDonateDirectly, setFinanceServices} = this.props;

    return (
      <div>
        {/* Donate Directly */}
        <div className="col-sm-6">
          <div className="bg-master-lightest full-width p-t-100 p-b-100 center-margin text-center">
            <Link to="/CountriesSelect" onClick={() => setDonateDirectly(true)}><h2>Donate Directly</h2></Link>
          </div>
        </div>
        {/* Finance Services */}
        <div className="col-sm-6">
          <div className="bg-master-lightest full-width p-t-100 p-b-100 center-margin text-center">
            <Link to="/CountriesSelect" onClick={() => setFinanceServices(true)}><h2>Finance Services</h2></Link>
          </div>
        </div>
      </div>
    );
  }
}

FundingTypeSelect.propTypes = {
  setDonateDirectly: PropTypes.func.isRequired,
  setFinanceServices: PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({
    setDonateDirectly: bindActionCreators(fundingTypeActions.setDonateDirectly, dispatch),
    setFinanceServices: bindActionCreators(fundingTypeActions.setFinanceServices, dispatch)
  })
)(FundingTypeSelect);
