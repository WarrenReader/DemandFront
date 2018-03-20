//MODULES
import React from 'react';

//CSS, ASSETS
import './Profile.css';

//COMPONENTS
export default class Profile extends React.Component {
   render() {
      return(
         <div className="profile-parent-container">
            <a href="/#/clients">← Back To Client List</a>
         </div>
      )
   }
}