import logo from './logo.svg';
import './App.css';
import MQTT from 'react-native-mqtt';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello World2!
        </a>
      </header>
    </div>
  );
}

export default App;