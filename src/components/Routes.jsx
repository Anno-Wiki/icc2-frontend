import React from 'react'
import {Route, Switch} from 'react-router-dom'
import routes from '../constants/routes'

import {TextsComponent} from './TextsComponent';
import {TocComponent} from './TocComponent';
import {ReadComponent} from './ReadComponent';


const Routes = () => {
  return (
    <Switch>
      <Route exact path={routes.Home} component={TextsComponent} />
      <Route exact path={routes.Users} component={TextsComponent} />
      <Route exact path={routes.Writers} component={TextsComponent} />
      <Route exact path={routes.Text} component={TextsComponent} />
      <Route exact path={`${routes.Text}/:textTitle`} component={TocComponent} />
      <Route exact path={`${routes.Text}/:textTitle/:tocID`} component={ReadComponent} />
      <Route exact path={routes.Tags} component={TextsComponent} />
    </Switch>
  )
}

export default Routes
