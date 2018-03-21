//MODULES
import React from 'react'
import {Switch, Route} from 'react-router-dom';

//COMPONENTS
import Login from '../components/Login/Login.js';
import Dashboard from '../components/Dashboard/Dashboard.js';
import Clients from '../components/Clients/Clients.js';
import Agency from '../components/Agency/Agency.js';
import Products from '../components/Products/Products.js';
import Users from '../components/Users/Users.js';
import Settings from '../components/Settings/Settings.js';
import Tasks from '../components/Tasks/Tasks.js';
import Roadmaps from '../components/Roadmaps/Roadmaps.js';
import Profile from '../components/Profile/Profile.js';

export default (
   <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/dashboard' component={Dashboard} />
      <Route exact path='/clients' component={Clients} />
      <Route exact path='/agency' component={Agency} />
      <Route path='/agency/products' component={Products} />
      <Route path='/agency/users' component={Users} />
      <Route path='/settings' component={Settings} />
      <Route path='/agency/tasks' component={Tasks} />
      <Route path='/agency/roadmaps' component={Roadmaps} />
      <Route path='/clients/profile' component={Profile} />
   </Switch>
)