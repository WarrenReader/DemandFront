//MODULES
import React from 'react';
import axios from 'axios';

//CSS, ASSETS
import './ClientProducts.css';

//COMPONENTS
export default class ClientProducts extends React.Component {
   constructor() {
      super()
      this.state = {
         products: []
      }
   }

   componentWillMount() {
      axios.get(`/api/client-products/${this.props.clientId}`).then(result =>
         this.setState({products: result.data}))
   }

   render() {
      return(
         <div className="client-profile-products">

            <table>         
               <thead>
                  <tr>
                     <th>Username</th>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Email</th>
                     <th>Action</th>
                  </tr>
               </thead>

               <tbody>
                  
               </tbody>
            </table>

         </div>
      )
   }
}