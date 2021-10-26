import React, {useState} from 'react';
import TileContainer from './TileContainer.js';
import Footer from './Footer.js';
import '../css/App.css';
import {customizeMethodList} from './MethodListCustom.js';
import {clientInit} from './Client.js';


const contractJSON = require("../contracts/SimpleStorage.json");


function App() {

  const [contractMethodList, setContractMethodList] = useState([]);

    let web3;
    let contractInstance;

    async function fetchConnection() {
          try {
              [web3, contractInstance] =  await clientInit(contractJSON);
              const contractMethodListTemp = await customizeMethodList(contractJSON, contractInstance, web3);
              setContractMethodList(contractMethodListTemp);
          } catch (err) {
              console.log(err);
          }
      }

  return (
    <div className="App">
      <header className="App-header">Simple Storage Application</header>
      <button onClick={fetchConnection} className="btn btn-secondary connectClient">Connect Client</button>
      <div className="tileContainer"><TileContainer contractMethodList={contractMethodList}/></div>
      <Footer/>
    </div>
  );
}

export default App;
