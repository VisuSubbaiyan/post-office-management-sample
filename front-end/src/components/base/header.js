import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

import {frameActions} from '../../actions/app-actions';

const styles = {
  tabStyle: {
    paddingTop: 16,
    marginBottom: 12,
    width: 220
  },
  appBarStyle: {
    position: 'fixed',
    top: 0,
    left: 0
  }
};

const handleOnChange = (navigateToScreen, resetAppState, updateAppState) => (value) => {
  resetAppState();
  if (value === 'shipment') {
    updateAppState({process: 'shipment'});
    navigateToScreen('postal-services');
  } else {
    updateAppState({process: 'office'});
    navigateToScreen('post-office-management');
  }
};

const Header = ({navigateToScreen, resetAppState, updateAppState, process}) => (
  <AppBar title="POST OFFICE" style={styles.appBarStyle} >
    {!!process && 
      <Tabs value={process} onChange={handleOnChange(navigateToScreen, resetAppState, updateAppState)}>
        <Tab label="POSTAL SERVICE" value="shipment" style={styles.tabStyle} />
        <Tab label="POST OFFICE MANAGEMENT" value="office" style={styles.tabStyle} />
      </Tabs>
    }
  </AppBar>
);

Header.propTyes = {
  navigateToScreen: PropTypes.func,
  resetAppState: PropTypes.func,
  updateAppState: PropTypes.func,
  process: PropTypes.string
};

export default connect(state => state, frameActions)(Header);
