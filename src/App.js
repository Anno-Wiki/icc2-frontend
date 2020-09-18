import React, { useEffect, useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {data['_source']['content']}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
