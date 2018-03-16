import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import {frameActions} from '../actions/app-actions';

const LandingScreen = ({navigateToScreen, resetAppState, updateAppState}) => (
  <div className="l-landing-screen">
    <div className="row">
      <div className="col-lg-3"></div>
      <div className="col-lg-3">
        <RaisedButton onClick={() => {resetAppState(); updateAppState({process: 'shipment'}); navigateToScreen('postal-services')}} label="POSTAL SERVICES" primary={true} fullWidth={true} />
      </div>
      <div className="col-lg-3">
        <RaisedButton onClick={() => {resetAppState(); updateAppState({process: 'office'}); navigateToScreen('post-office-management')}} label="POST OFFICE MANAGEMENT" primary={true}  fullWidth={true} />
      </div>
      <div className="col-lg-3"></div>
    </div>
  </div>
);

export default connect(state => state, frameActions)(LandingScreen);
