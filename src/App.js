//MODULES
import React from 'react';

//CSS, ASSETS
import './App.css';

//COMPONENTS
import routes from './routes/routes.js';

//COMPONENT
export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}