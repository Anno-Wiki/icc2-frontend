import React, {useEffect, useState} from 'react'
import {NavLink, Route, Switch, useLocation} from 'react-router-dom'
import routes from '../constants/routes'
import {TextsComponent} from "./TextsComponent";
import axios from '../utilities/axiosInstance'

const Test2 = () => {
  const location = useLocation()
  const [texts, setTexts] = useState('')
  useEffect(() => {
    axios.get(`/toc/${location.state.bookid}-${location.state.tocID}/formatted`).then(res => setTexts(res.data)).catch(err => console.log(err))
  }, [location.state])
  const createText = () => {
    return {__html: texts.text}
  }
  return(
    <div dangerouslySetInnerHTML={createText()} />
  )
}

const TestComponent = () => {
  const location = useLocation()
  const [tocs, setTocs] = useState([])
  useEffect(() => {
    axios.get(`/toc/${location.state.bookid}/all`).then(res => setTocs(res.data.results)).catch(err => console.log(err))
  }, [location.state])
  const Toc = ({content, id}) => {
    return(
      <div>
        <NavLink to={{pathname: `/text/${location.state.bookTitle}/${id}`, state: {bookid: location.state.bookid, tocID: id}}}>{content}</NavLink>
      </div>
    )
  }
  return (
    <>
    <h1>Test Component</h1>
      {tocs.map(toc =>
        <Toc content={toc.content} id={toc.id}/>
      )}
      </>
  )
}
const Routes = () => {
  return (
    <Switch>
      <Route exact path={routes.Home} component={TextsComponent} />
      <Route exact path={routes.Users} component={TextsComponent} />
      <Route exact path={routes.Writers} component={TextsComponent} />
      <Route exact path={routes.Text} component={TextsComponent} />
      <Route exact path={`${routes.Text}/:textTitle`} component={TestComponent} />
      <Route exact path={`${routes.Text}/:textTitle/:tocID`} component={Test2} />
      <Route exact path={routes.Tags} component={TextsComponent} />
    </Switch>
  )
}

export default Routes
