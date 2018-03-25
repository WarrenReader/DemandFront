//MODULES
import React from 'react';
import axios from 'axios';

//CSS, ASSETS
import './CreateUser.css';

//COMPONENT
export default class CreateUser extends React.Component {
   render() {
      return(
         <div className="create-user-table">
            <table>
                        
               <thead>
                  <tr>
                     <th>Username</th>
                     <th>Password</th>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Email</th>
                     <th>Action</th>
                  </tr>
               </thead>

            </table>
         </div>
      )
   }
}