//MODULES
import React from 'react';

//CSS, ASSETS
import './App.css';

//COMPONENTS
import routes from './routes/routes.js';
import Navigation from '../src/components/Navigation/Navigation.js';

//COMPONENT
export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        {document.location.hash === '#/' ? null : <Navigation />}
          <div className={document.location.hash === '#/' ? null : 'main'}>
          {routes}
          </div>
      </div>
    )
  }
}