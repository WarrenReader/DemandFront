//MODULES
import React from 'react'
import {Switch, Route} from 'react-router-dom';

//COMPONENTS
import Login from '../components/Login/Login.js';
import UserCreator from '../components/UserCreator/UserCreator.js';
import Dashboard from '../components/Dashboard/Dashboard.js';
import Clients from '../components/Clients/Clients.js';
import Agency from '../components/Agency/Agency.js';
import Products from '../components/Products/Products.js';
import Users from '../components/Users/Users.js';

export default (
   <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/create-user' component={UserCreator} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/clients' component={Clients} />
      <Route exact path='/agency' component={Agency} />
      <Route path='/agency/products' component={Products} />
      <Route path='/agency/users' component={Users} />
   </Switch>
)