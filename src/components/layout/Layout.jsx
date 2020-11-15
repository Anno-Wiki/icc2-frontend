import React from 'react'
import Header from './Header';
import styled from 'styled-components';

const Body = styled.div`
width: 50%;
margin: 5rem auto;
`

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <Body>
        {children}
      </Body>
    </>
  )
}

export default Layout
