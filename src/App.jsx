import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import './global/reset.css';

import Routes from './components/Routes';
import Layout from './components/layout/Layout';

import AppStateProvider from './providers/AppStateProvider';

import { ThemeProvider } from 'styled-components';
import { theme } from './global/theme';
import GlobalStyle from './global/GlobalStyle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppStateProvider>
          <Layout>
            <Routes />
          </Layout>
        </AppStateProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
