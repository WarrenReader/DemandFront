//MODULES
import React from 'react';

//CSS, ASSETS
import './Agency.css';

//COMPONENTS
import Header from '../Header/Header.js';

//COMPONENT
export default class Agency extends React.Component {
   render() {
      return(
         <div>
            <Header view='agency'/>
            Agency
         </div>
      )
   }
}