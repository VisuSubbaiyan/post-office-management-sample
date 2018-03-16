import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {appActions} from '../actions/app-actions';
import Loader from './base/loader';
import WarningPopup from './base/warning-popup'
import Error from './base/error';
import Header from './base/header';

const App = ({children, showLoader,  error}) => (
  <MuiThemeProvider>
    <div className="main-container">
      <WarningPopup />
      <Header />
      {showLoader && <Loader />}
      {error && <Error />}
      {children}
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.object]),
  showLoader: PropTypes.bool,
  error: PropTypes.bool
};

export default connect(state => state, appActions)(App);
