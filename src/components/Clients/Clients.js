//MODULES
import React from 'react';

//CSS AND ASSETS
import './Clients.css';

//COMPONENTS
import Header from '../Header/Header.js';

//COMPONENT
export default class Clients extends React.Component {
   render() {
      return(
         <div>
            <Header view="clients"/>
            Clients
         </div>
      )
   }
}