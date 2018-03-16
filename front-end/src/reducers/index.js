import {combineReducers} from 'redux';

// If we have more number of module, we can use combineReducers
// we can use combineReducers from react-redux-immutable to create immutable state.
// we can use setIn, updateIn etc., methods to update state easily
const rootReducer = combineReducers({
  state: (state = {}) => state
});

export default rootReducer;
