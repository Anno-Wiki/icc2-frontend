import React from 'react';
import { NavLink } from 'react-router-dom';
import baseRoutes from '../../constants/routes';
import styled from 'styled-components';
import LoginButton from '../Login';

const Nav = styled.nav`
display: flex;
justify-content: space-around;
padding: 1rem 0;
margin: 0 auto;
width: 50%;
`
const Link = styled(NavLink)`
text-decoration: none;
font-family: ${({theme}) => theme.font.display};
font-weight: bold;
font-size: 1.5rem;
color: ${({theme}) => theme.color.black};
transition: color ${({theme}) => theme.transition.short} linear;
&:hover {
  color: ${({theme}) => theme.color.gray};
}
`

const Header = () => {
  const routesAsText = Object.entries(baseRoutes)
  return (
    <Nav>
      {routesAsText.map(linkInfo => <Link key={linkInfo[1]} to={linkInfo[1]}>{linkInfo[0]}</Link>)}
      <LoginButton />
    </Nav>
  )
}

export default Header
