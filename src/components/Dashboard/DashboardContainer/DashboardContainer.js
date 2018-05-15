//MODULES
import React from 'react';
import {connect} from 'react-redux';

//COMPONENTS
import HorizontalLine from '../../Assets/HorizontalLine/HorizontalLine.js';
import ExistingClients from '../ExistingClients/ExistingClients.js';

//COMPONENT
class Dashboard extends React.Component {

	render() {

    let {agencies_id} = this.props.user;

		return(
			<div className="dashboard-parent">
				<h1>Clients</h1>
				<HorizontalLine />
				<ExistingClients agencyId={agencies_id}/>

			</div>
		)
	}
}

function mapStateToProps(state) {
   return {
      user: state.user
   }
}

export default connect(mapStateToProps)(Dashboard)