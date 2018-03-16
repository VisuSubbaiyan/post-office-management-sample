import {UPDATE_APP_STATE, RESET_APP_STATE} from '../actions/app-actions';

export const INITIAL_STATE = {
  shipmentsList: [],
  selectedItem: null,
  showLoader: false,
  showWarning: false
};

/**
`appReducer` - application reducers
@param {Object} state - application state
@param {Object} action - action details
@returns {Object} new state
*/
export const appReducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case UPDATE_APP_STATE:
      return Object.assign({}, state, payload);
    
    case RESET_APP_STATE:
      return INITIAL_STATE; 

    default:
      return state;
  }
};
