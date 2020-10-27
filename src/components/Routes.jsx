import React from 'react'
import {Route, Switch} from 'react-router-dom'
import routes from '../constants/routes'
import {TextsComponent} from "./TextsComponent";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={routes.Home} component={TextsComponent} />
      <Route exact path={routes.Users} component={TextsComponent} />
      <Route exact path={routes.Writers} component={TextsComponent} />
      <Route exact path={routes.Texts} component={TextsComponent} />
      <Route exact path={routes.Tags} component={TextsComponent} />
    </Switch>
  )
}

export default Routes
