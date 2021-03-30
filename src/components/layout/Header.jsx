import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

import baseRoutes from '../../constants/routes';
import axios from '../../utilities/axiosInstance';
import LoginButton from '../Login';
import LogoutButton from '../Logout';

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
  const [userMetadata, setUserMetadata] = useState(null);
  const [loggedin, setLoggedin] = useState(false);

  const routesAsText = Object.entries(baseRoutes)
  const { user, isAuthenticated } = useAuth0();

  const LogButton = isAuthenticated ? LogoutButton : LoginButton;
  return (
    <Nav>
      {routesAsText.map(linkInfo => <Link key={linkInfo[1]} to={linkInfo[1]}>{linkInfo[0]}</Link>)}
      <LogButton />
    </Nav>
  )
}

export default Header
