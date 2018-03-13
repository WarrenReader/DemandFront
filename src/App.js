//MODULES
import React from 'react';

//CSS, ASSETS
import './App.css';

//COMPONENTS
import routes from './routes/routes.js';
import Header from '../src/components/Header/Header.js';

//COMPONENT
export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-body">
          {routes}
        </div>
      </div>
    );
  }
}