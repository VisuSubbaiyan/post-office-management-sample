import {push, goBack} from 'react-router-redux';
import {postalService} from '../services/postal-service';

const ns = 'application.actions';

/**
`navigateToScreen` - navigate to respective screen
@param {string} path - screen path
*/
const navigateToScreen = (path) => push(`/${path}`);

/**
navigate back to previous screen
*/
const navigateBack = () => goBack();

export const UPDATE_APP_STATE = `${ns}.updateAppState`;

/**
`updateAppSate` - update application state data
@param {Object} payload - app data
@returns {Object} React.Action
*/
const updateAppState = (payload) => ({
  type: UPDATE_APP_STATE,
  payload
});

export const RESET_APP_STATE = `${ns}.resetAppState`;

const resetAppState = () => ({type: RESET_APP_STATE});

const getShipmentList = () => async (dispatch, getState) => {
  dispatch(updateAppState({showLoader: true}));
  const responseData = await postalService('GET', '/shipment/list')
    .then(response => response, () => 'failed');

  if (responseData === 'failed') {
    dispatch(updateAppState({error: true}));
  } else if(responseData && responseData.length > 0) {
    dispatch(updateAppState({shipmentsList: responseData, error: false}));
  }
  
  dispatch(updateAppState({showLoader: false}));
};

const addSelctedItem = () => async (dispatch, getState) => {
  const selectedItem = getState().selectedItem;
  const process = getState().process;
  
  dispatch(updateAppState({showLoader: true}));
  const responseData = await postalService('POST', `/${process}/add`, selectedItem)
    .then(response => response, () => 'failed');
  
  if (responseData === 'failed') {
    dispatch(updateAppState({error: true, showLoader: false}));
  } else {
    dispatch(updateAppState({showLoader: false, error: false, selectedItem: null}));
    dispatch(navigateToScreen(process === 'shipment' ? 'postal-services' : 'post-office-management'));
  }
};

const updateSelectedItem = () => async (dispatch, getState) => {
  const selectedItem = getState().selectedItem;
  const process = getState().process;

  dispatch(updateAppState({showLoader: true}));
  const responseData = await postalService('POST', `/${process}/update`, selectedItem)
    .then(response => response, () => 'failed');
  
  if (responseData === 'failed') {
    dispatch(updateAppState({error: true, showLoader: false}));
  } else {
    dispatch(updateAppState({showLoader: false, error: false, selectedItem: null}));
    dispatch(navigateToScreen(process === 'shipment' ? 'postal-services' : 'post-office-management'));
  }
};

const deleteSelectedItem = () => async (dispatch, getState) => {
  const selectedItem = getState().selectedItem;
  const process = getState().process;

  dispatch(updateAppState({showLoader: true}));
  const responseData = await postalService('POST', `/${process}/delete`, selectedItem)
    .then(response => response, () => 'failed');
  
  if (responseData === 'failed') {
    dispatch(updateAppState({error: true}));
  } else {
    const key = process === 'shipment' ? 'shipmentsList' : 'officeList';
    const filteredList = getState()[key].filter(item => item.id !== selectedItem.id);

    dispatch(updateAppState({[key]: filteredList, error: false}));
  }
  
  dispatch(updateAppState({showLoader: false}));
};

const getOfficeList = () => async (dispatch, getState) => {
  dispatch(updateAppState({showLoader: true}));
  const responseData = await postalService('GET', '/office/list')
    .then(response => response, () => 'failed');

  if (responseData === 'failed') {
    dispatch(updateAppState({error: true}));
  } else if(responseData && responseData.length > 0) {
    dispatch(updateAppState({officeList: responseData, error: false}));
  }
  
  dispatch(updateAppState({showLoader: false}));
};

export const appActions = {
  navigateToScreen,
  navigateBack,
  updateAppState,
  getShipmentList,
  addSelctedItem,
  updateSelectedItem,
  deleteSelectedItem,
  getOfficeList
};

export const frameActions = {
  navigateToScreen,
  resetAppState,
  updateAppState,
  deleteSelectedItem
};
