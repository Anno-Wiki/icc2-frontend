import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import './global/reset.css';

import Routes from './components/Routes';
import Layout from './components/layout/Layout';

import AppStateProvider from './providers/AppStateProvider';

import { ThemeProvider } from 'styled-components';
import { theme } from './global/theme';
import Flash from './components/Flash'
import Bus from './utilities/bus';
import GlobalStyle from './global/GlobalStyle';

function App() {
  window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Flash />
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
