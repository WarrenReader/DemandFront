//COMPONENTS
import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {getClients} from '../../../redux/reducer.js';

//CSS, ASSETS
import './ExistingClients.css';

//COMPONENT
class ExistingClients extends React.Component {

  render() {
    const {clients} = this.props;
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

function mapStateToProps(state) {
  return {
      user: state.user
    , clients: state.clients
  }
}

export default connect(mapStateToProps, {getClients})(ExistingClients);