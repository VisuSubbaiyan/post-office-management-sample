import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import {deriveStatus} from '../../helpers/app-helper';

const ListItemRenderer = ({item, navigateToScreen, updateAppState, index}) => {
  const handleClick = (type) => () => {
    if (type === 'edit') {
      updateAppState({selectedItem: item});
      navigateToScreen('postal-services/add-edit-screen');
    } else {
      updateAppState({selectedItem: item, showWarning: true});
    }
  };
  const status = deriveStatus(item);
  const className = index % 2 === 0 ? 'row no-gutters list-group-item' : 'row no-gutters list-group-item list-group-item-info';

  return (
    <div className={className}>
      <div className="col-lg-2">{item.id}</div>
      <div className="col-lg-1">{item.type.name}</div>
      <div className="col-lg-2">{item.weight.desc}</div>
      <div className="col-lg-2">{status}</div>
      <div className="col-lg-1">{item.office.PLZ}</div>
      <div className="col-lg-2">{item.office.name}</div>
      <div className="col-lg-2">
        <IconButton onClick={handleClick('edit')}><ImageEdit /></IconButton>
        <IconButton onClick={handleClick('delete')}><ActionDelete /></IconButton>
      </div>
    </div>
  );
};

ListItemRenderer.propTypes = {
  listItem: PropTypes.object,
  navigateToScreen: PropTypes.func
};

export default ListItemRenderer;
