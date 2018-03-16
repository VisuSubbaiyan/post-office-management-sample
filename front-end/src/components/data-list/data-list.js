import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {appActions} from '../../actions/app-actions';
import ListItemRenderer from './list-item-renderer';
import HeaderItemRenderer from './header-item-renderer';

const prepareListItems = (listItems = [], navigateToScreen, updateAppState, itemRenderer) => {
  const ItemRenderer = itemRenderer;
  if (listItems.length > 0) {
    return listItems.map((item, index) => (
      <ItemRenderer
        key={item.id}
        index={index}
        item={item}
        navigateToScreen={navigateToScreen}
        updateAppState={updateAppState}
      />
    ));
  }

  return (<div>{'No records'}</div>);
};

const DataList = ({dataList, navigateToScreen, updateAppState, itemRenderer, dataListHeader}) => {
  const HeaderItemRenderer = dataListHeader;
  return (
    <div className="list-group">
      <HeaderItemRenderer />
      {prepareListItems(dataList, navigateToScreen, updateAppState, itemRenderer)}
    </div>
  );
};

DataList.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.object),
  navigateToScreen: PropTypes.func,
  updateAppState:PropTypes.func,
  itemRenderer: PropTypes.func,
  dataListHeader: PropTypes.func
};

DataList.defaultProps = {itemRenderer: ListItemRenderer, dataListHeader: HeaderItemRenderer};

export default DataList;
