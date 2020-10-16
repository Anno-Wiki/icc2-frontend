import React from 'react'
import {NavLink} from 'react-router-dom'
import routes from '../../constants/routes'

const Header = () => {
  const routesAsText = Object.entries(routes)
  return (
    <div>
      {routesAsText.map(linkInfo => <NavLink to={linkInfo[1]}>{linkInfo[0]}</NavLink>)}
    </div>
  )
}

export default Header
