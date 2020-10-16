import React from 'react'
import {Route, Switch} from 'react-router-dom'
import routes from '../constants/routes'
import {useAppState} from "../providers/AppStateProvider";

const FillerComponent = () => {
  return (
    <h1>HI</h1>
  )
}

const FillerComponent2 = () => {
  return (
    <h1>HI2</h1>
  )
}

const FillerComponent3 = () => {
  const [{theme,toggleTheme}] = useAppState()
  console.log(theme)
  return (
    <>
      <h1>HI3</h1>
      <button onClick={toggleTheme}>Change theme</button>
    </>
  )
}


const Routes = () => {
  return (
    <Switch>
      <Route exact path={routes.Home} component={FillerComponent} />
      <Route exact path={routes.Users} component={FillerComponent2} />
      <Route exact path={routes.Writers} component={FillerComponent3} />
      <Route exact path={routes.Texts} component={FillerComponent2} />
      <Route exact path={routes.Tags} component={FillerComponent} />
    </Switch>
  )
}

export default Routes
