//MODULES
import React from 'react';
import {connect} from 'react-redux';

//CSS AND ASSETS
import './Clients.css';

//COMPONENTS
import HorizontalLine from '../Assets/HorizontalLine/HorizontalLine.js';
import ExistingClients from './ExistingClients/ExistingClients.js';

//COMPONENT
class Clients extends React.Component {

   render() {

      return(
         <div className="clients-parent">
            <h1>Clients</h1>
            <HorizontalLine />
            <ExistingClients agencyId={this.props.user.agencies_id}/>

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