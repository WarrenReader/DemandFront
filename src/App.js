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
      <div className="app">
        {document.location.hash === '#/' ? null : <Header />}
          {routes}
      </div>
    )
  }
}