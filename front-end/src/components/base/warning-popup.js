import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {pick} from 'lodash';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import {frameActions} from '../../actions/app-actions';
 
const buttonStyle = {
  width: 100,
  margin: 10
};

const WarningPopup = ({selectedItem, updateAppState, deleteSelectedItem, showWarning}) => {
  const handleClick = (buttonType) => {
    if(buttonType === 'yes') {
      deleteSelectedItem();
    }
    
    updateAppState({selectedItem: null, showWarning: false});
  };

  const actions = [
    <RaisedButton
      label="No"
      primary={true}
      onClick={() => handleClick('no')}
      style={buttonStyle}
    />,
    <RaisedButton
      label="Yes"
      primary={true}
      keyboardFocused={true}
      onClick={() => handleClick('yes')}
      style={buttonStyle}
    />,
  ];

  return (
    <Dialog
      title="Warning!"
      actions={actions}
      modal={true}
      open={showWarning}
    >
      {`Are you sure wants to delete ${(selectedItem || {}).id}?`}
    </Dialog>
  );
};

WarningPopup.propTypes = {
  selectedItem: PropTypes.object,
  updateAppState: PropTypes.func,
  deleteSelectedItem: PropTypes.func,
  showWarning: PropTypes.bool
};

export default connect(state => pick(state, ['selectedItem', 'showWarning']), frameActions)(WarningPopup);
