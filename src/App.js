import React, { useEffect, useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {

  const url = 'http://192.168.0.202:5000/internalapi';
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
