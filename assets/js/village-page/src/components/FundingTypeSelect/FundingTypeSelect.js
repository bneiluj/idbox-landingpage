import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './FundingTypeSelect.css';
import * as fundingTypeSelectActions from '../../actions/fundingTypeSelect';

export class FundingTypeSelect extends Component { // Component is exported for testing without being connected to Redux
  render() {
    const {setDonateDirectly, setFinanceServices} = this.props;

    return (
      <div className="FundingTypeSelect m-t-50 m-b-50 clearfix">
        {/* Donate Directly */}
        <div className="col-sm-6">
          <div className="bg-master-lightest FundingTypeSelect-innerButtonWrap">
            <Link to="/countries" onClick={() => setDonateDirectly(true)}><h2>Donate Directly</h2></Link>
          </div>
        </div>
        {/* Finance Services */}
        <div className="col-sm-6">
          <div className="bg-master-lightest FundingTypeSelect-innerButtonWrap">
            <Link to="/services" onClick={() => setFinanceServices(true)}><h2>Finance Services</h2></Link>
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
    setDonateDirectly: bindActionCreators(fundingTypeSelectActions.setDonateDirectly, dispatch),
    setFinanceServices: bindActionCreators(fundingTypeSelectActions.setFinanceServices, dispatch)
  })
)(FundingTypeSelect);
