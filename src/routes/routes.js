import React from 'react'
import {Switch, Route} from 'react-router-dom';

//COMPONENTS
import Login from '../components/Login/Login.js';
import UserCreator from '../components/UserCreator/UserCreator.js';
import Dashboard from '../components/Dashboard/Dashboard.js';


export default (
   <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/create-user' component={UserCreator} />
      <Route path='/dashboard' component={Dashboard} />
   </Switch>
)