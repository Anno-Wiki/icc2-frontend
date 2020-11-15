import React from 'react'
import {NavLink} from 'react-router-dom'
import baseRoutes from '../../constants/routes'
import styled from 'styled-components';

const Nav = styled.nav`
display: flex;
justify-content: space-around;
padding: 1rem 0;
margin: 0 auto;
width: 65%;
`
const Link = styled(NavLink)`
text-decoration: none;
font-family: ${props => props.theme.font.display};
font-weight: bold;
font-size: 2rem;
color: ${props => props.theme.color.black};
transition: color ${props => props.theme.transitionShort} linear;
&:hover {
  color: ${props => props.theme.color.gray};
}
`

const Header = () => {
  const routesAsText = Object.entries(baseRoutes)
  return (
    <Nav>
      {routesAsText.map(linkInfo => <Link key={linkInfo[1]} to={linkInfo[1]}>{linkInfo[0]}</Link>)}
    </Nav>
  )
}

export default Header
