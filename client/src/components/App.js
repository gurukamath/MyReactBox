import TileContainer from './TileContainer.js';
import Footer from './Footer.js';
import '../css/App.css';
import {clientInit} from './Client.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">Simple Storage Application</header>
      <button onClick={clientInit} className="btn btn-secondary connectClient">Connect Client</button>
      <TileContainer/>
      <Footer/>
    </div>
  );
}

export default App;
