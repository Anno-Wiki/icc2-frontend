import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../constants/routes';

import { TextsComponent } from './TextsComponent';
import { TocComponent } from './TocComponent';
import { Profile } from './UserProfile.jsx';
import RegisterComponent from './Register';
import ReadContainer from '../containers/ReadContainer';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={routes.Home} component={TextsComponent} />
      <Route exact path={routes.Users} component={Profile} />
      <Route exact path={routes.Writers} component={TextsComponent} />
      <Route exact path={routes.Text} component={TextsComponent} />
      <Route exact path={'/register'} component={RegisterComponent} />
      <Route
        exact
        path={`${routes.Text}/:textTitle`}
        component={TocComponent}
      />
      <Route
        exact
        path={`${routes.Text}/:textTitle/:tocID`}
        component={ReadContainer}
      />
      <Route exact path={routes.Tags} component={TextsComponent} />
    </Switch>
  );
};

export default Routes;
