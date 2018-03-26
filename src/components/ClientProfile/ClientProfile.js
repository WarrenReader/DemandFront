//MODULES
import React from 'react';

//CSS, ASSETS
import './ClientProfile.css';

//COMPONENTS
import HorizontalLine from '../Assets/HorizontalLine/HorizontalLine.js';
import ClientDetails from './ClientDetails/ClientDetails.js';

//COMPONENTS
export default class Profile extends React.Component {
   constructor() {
      super()
      this.state = {
         profile: {}
      }
   }


   render() {

      return(
         <div className="client-profile-parent">

            <a href="/#/clients" className="back">← Back To Client List</a>
            
            <h1>Client Details</h1>
            <HorizontalLine />
            <ClientDetails clientId={this.props.location.search} />

            <h1>Products</h1>
            <HorizontalLine />

            <h1>Notes</h1>
            <HorizontalLine />

         </div>
      )
   }
}