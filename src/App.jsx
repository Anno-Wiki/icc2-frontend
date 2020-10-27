import React from 'react';

import {BrowserRouter as Router} from 'react-router-dom'

import './App.css';
import Routes from "./components/Routes";
import Layout from "./components/layout/Layout";
import AppStateProvider from "./providers/AppStateProvider";

function App() {
  return (
    <Router>
      <AppStateProvider>
        <Layout>
          <Routes />
        </Layout>
      </AppStateProvider>
    </Router>
  );
}

export default App;
