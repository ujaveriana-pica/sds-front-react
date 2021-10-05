import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Ventanilla</Link>
          </li>
          <li>
            <Link to="/tramites">Estado de trámites</Link>
          </li>
          <li>
            <Link to="/autorizacion-titulos">Autorización titulos</Link>
          </li>
        </ul>
      </nav>
      <div className="App">
          <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
