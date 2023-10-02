import React from 'react';

import './css/cvss.css';
import Main from './components/Main';

function App() {
  return (
    <>
      <hgroup>
        <h3>CVSS v3.1 Base Score Calculator</h3>
      </hgroup>
      <br />
      <div id="cvssboard">
        <Main />
      </div>
      <footer id="footer">
        <br /><a href="https://github.com/cvssjs">CVSSjs</a> is free to use, copy, modification under a BSD like licence.
        <br />Common Vulnerability Scoring System (CVSS) is a free and open standard. It is owned and managed by <a href="http://www.first.org/cvss">FIRST.Org</a>.
      </footer>
    </>
  );
}

export default App;
