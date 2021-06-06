import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { isAuthenticated, delToken } from '../../utilities/axiosInstance';

import baseRoutes from '../../constants/routes';

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 1rem 0;
  margin: 0 auto;
  width: 90%;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.nav};
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.black};
  transition: color ${({ theme }) => theme.transition.short} linear;
  &:hover { color: ${({ theme }) => theme.color.gray}; }
`;

const SmallLink = styled(Link)`
  font-size: 1rem;
  font-weight: normal;
`;
const Button = styled.button`
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.nav};
  font-size: 1rem;
  font-weight: normal;
  color: ${({ theme }) => theme.color.black};
  transition: color ${({ theme }) => theme.transition.short} linear;
  &:hover { color: ${({ theme }) => theme.color.gray}; }
`;


const Header = () => {
  const routesAsText = Object.entries(baseRoutes);

  return (
    <Nav>
      {routesAsText.map(linkInfo => (
        <Link key={linkInfo[1]} to={linkInfo[1]}>
          {linkInfo[0]}
        </Link>
      ))}
      { !isAuthenticated && <SmallLink to={'Register'}>register</SmallLink>}
      { !isAuthenticated && <SmallLink to={'Login'}>login</SmallLink>}
      { isAuthenticated && <Button onClick={() => delToken()}>Logout</Button> }
    </Nav>
  );
};

export default Header;
