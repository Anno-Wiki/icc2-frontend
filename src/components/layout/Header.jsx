import React from 'react'
import {NavLink} from 'react-router-dom'
import baseRoutes from '../../constants/routes'
import styled from 'styled-components';

const Nav = styled.nav`
display: flex;
justify-content: space-around;
`
const Link = styled(NavLink)`
text-decoration: none;
`

const Header = () => {
  const routesAsText = Object.entries(baseRoutes)
  return (
    <Nav>
      {routesAsText.map(linkInfo => <Link to={linkInfo[1]}>{linkInfo[0]}</Link>)}
    </Nav>
  )
}

export default Header
