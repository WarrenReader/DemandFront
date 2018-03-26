//COMPONENTS
import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';

//CSS, ASSETS
import './ExistingClients.css';

//COMPONENT
export default class ExistingClients extends React.Component {
   constructor() {
      super()
      this.state = {
         clients: []
      }
   }

   componentWillMount() {
      axios.get(`/api/clients/?agencyId=${this.props.agencyId}`).then(result => 
         this.setState({clients: result.data})
      )
   }

   render() {
      const {clients} = this.state;
      const clientsResult = clients.map((e, index) => 
         <tr key={index}>
            <td>{e.client_name}</td>
            <td>{e.url}</td>
            <td>{e.product_name}</td>
            <td>{e.price}</td>
            <td><Moment format="MM-DD-YYYY">{e.sign_up_date}</Moment></td>
            <td><a href={`/#/clients/profile/?id=${e.clients_id}`}>View Client</a></td>
         </tr>
      )

      return(
         <div className="existing-clients-table">

            <table>  

               <thead>
                  <tr>
                     <th>Client</th>
                     <th>URL</th>
                     <th>Product</th>
                     <th>Price</th>
                     <th>Client Since</th>
                     <th>Action</th>
                  </tr>
               </thead>

               <tbody>
                  {clientsResult}
               </tbody>

               </table>

         </div>
      )
   }
}