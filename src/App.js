import React from 'react';
import './app.scss';
import Nav from './Components/Nav/Nav'
import routes from './routes'

function App() {
  return (
    <div className="App">
        <Nav />
        <div className="main-page">
          {routes}
        </div>
    </div>
  );
}

export default App;
