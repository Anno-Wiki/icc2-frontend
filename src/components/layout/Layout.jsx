import React from 'react';
import Header from './Header';
import styled from 'styled-components';
import { breakpoints } from '../../global/breakpoints';

const Body = styled.div`
  width: 50%;
  margin: 1rem auto;
  ${breakpoints.vp10} {
    width: 80%;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Body>{children}</Body>
    </>
  );
};

export default Layout;
