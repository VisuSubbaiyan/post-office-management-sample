import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {Router, browserHistory, useRouterHistory} from 'react-router';

import {INITIAL_STATE, appReducer} from './reducers/app-reducer';
import routes from './routes/routes';

const rebaseBrowserHistory = useRouterHistory(() => browserHistory)({basename: '/'});
const middleware = applyMiddleware(thunk, routerMiddleware(rebaseBrowserHistory));
const devTool = (window.devToolsExtension ? window.devToolsExtension() : f => f);

const createStoreWithMiddleware = compose(middleware, devTool)(createStore)(appReducer, INITIAL_STATE);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
  , document.querySelector('.container'));
