import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import {deriveStatus} from '../../helpers/app-helper';

const OfficeListItemRenderer = ({item, navigateToScreen, updateAppState, index}) => {
  const handleClick = (type) => () => {
    if (type === 'edit') {
      updateAppState({selectedItem: item});
      navigateToScreen('post-office-management/add-edit-screen');
    } else {
      updateAppState({selectedItem: item, showWarning: true});
    }
  };

  const className = index % 2 === 0 ? 'row no-gutters list-group-item' : 'row no-gutters list-group-item list-group-item-info';

  return (
    <div className={className}>
      <div className="col-lg-5">{item.id}</div>
      <div className="col-lg-3">{item.name}</div>
      <div className="col-lg-2">{item.PLZ}</div>
      <div className="col-lg-2">
        <IconButton onClick={handleClick('edit')}><ImageEdit /></IconButton>
        <IconButton onClick={handleClick('delete')}><ActionDelete /></IconButton>
      </div>
    </div>
  );
};

OfficeListItemRenderer.propTypes = {
  listItem: PropTypes.object,
  navigateToScreen: PropTypes.func
};

export default OfficeListItemRenderer;
