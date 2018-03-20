//MODULES
import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

//CSS AND ASSETS
import './Clients.css';

//COMPONENT
class Clients extends React.Component {
   constructor() {
      super()
      this.state = {
         clients: []
      }
   }

   componentWillMount() {
      axios.get(`/api/client-products/?agencyId=${this.props.user.agency_id}`).then(result => {
         this.setState({clients: result.data})
      })
   }


   render() {

      const {clients} = this.state;
      const clientList = clients.map((e, index) => 
         <div key={index} className="unique-client">
            <span>Name: {e.client_name}</span>
            <span>Product(s): {e.client_products_id.length}</span>
            <span>Spend: {e.client_spend}</span>
            <a href={`/#/clients/profile/?id=${e.client_id}`}>View Client</a>
         </div>
      )

      return(
         <div className="clients-parent-container">
            <div className="clients-child-container">
               <h1>Clients</h1>
               <div className="clients-child-inner">
                  {clientList}
               </div>
            </div>
         </div>
      )
   }
}


function mapStateToProps(state) {
   return {
      user: state.user
   }
}

export default connect(mapStateToProps)(Clients)