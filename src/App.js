import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav'
import Home from './Components/Home/Home'
import routes from './routes'

function App() {
  return (
    <div className="App">
        <Nav />
        {routes}
    </div>
  );
}

export default App;
