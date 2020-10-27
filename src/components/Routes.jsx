import React, { useState, useEffect } from 'react'
import {Route, Switch} from 'react-router-dom'
import routes from '../constants/routes'
import {useAppState} from "../providers/AppStateProvider";
import axios from 'axios';

const url = 'http://192.168.0.202:5000/_api';

const TextsComponent = () => {
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        axios.get(url + '/text/all')
            .then(resp => {
                setTexts(resp.data.results);
            }, error => {
                console.log(error);
            });
    }, [url]);

    return (
        <div>
            <ul>
                {texts.map((text, index) => (
                    <li key={text.slug}>
                        <h1>{text.name}</h1>
                    </li>
                ))}
            </ul>
        </div>
    )

}

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
