import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../components/app';
import LandingScreen from '../components/landing-screen';
import PostalServicesMainScreen from '../components/postal-services/postal-services-main-screen';
import PostalServicesAddEditScreen from '../components/postal-services/postal-services-add-edit-screen';
import PostOfficeManagementMainScreen from '../components/post-office-management/post-office-management-main-screen';
import PostOfficeManagementAddEditScreen from '../components/post-office-management/post-office-management-add-edit-screen';

const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={LandingScreen} />
      <Route path="landing-screen" component={LandingScreen} />
      <Route path="postal-services">
        <IndexRoute component={PostalServicesMainScreen} />
        <Route path="main-screen" component={PostalServicesMainScreen} />
        <Route path="add-edit-screen" component={PostalServicesAddEditScreen} />
      </Route>
      <Route path="post-office-management">
        <IndexRoute component={PostOfficeManagementMainScreen} />
        <Route path="main-screen" component={PostOfficeManagementMainScreen} />
        <Route path="add-edit-screen" component={PostOfficeManagementAddEditScreen} />
      </Route>
    </Route>
  );

export default routes;
