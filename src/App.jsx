import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {BrowserRouter as Router} from 'react-router-dom'

import './App.css';
import Routes from "./components/Routes";
import Layout from "./components/layout/Layout";
import AppStateProvider from "./providers/AppStateProvider";

const BASE_URL = process.env.REACT_APP_DEV_API_URL;

function App() {

  const url = `${BASE_URL}/internalapi`;
  const [data, setData] = useState({'_source': 2});

  useEffect(() => {
    axios.get(url)
      .then(resp => {
        setData(resp.data);
        console.log(resp.data);
      }, error => {
        console.log(error);
      });
  }, [url]);

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
