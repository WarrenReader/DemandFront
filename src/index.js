import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import './reset.css';
import './index.css';
import App from './App';
import {HashRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
   <HashRouter>
      <Provider store={store}>
         <MuiThemeProvider>
            <App />
         </MuiThemeProvider>
      </Provider>
   </HashRouter>
   , document.getElementById('root'));
