//MODULES
import React from 'react';
import {connect} from 'react-redux';

//CSS, ASSETS
import './Dashboard.css';

//COMPONENTS
import HorizontalLine from '../Assets/HorizontalLine/HorizontalLine.js';
import Clients from '../Clients/ExistingClients/ExistingClients.js';

//COMPONENT
class Dashboard extends React.Component {

	render() {

		return(
			<div className="dashboard-parent">
				<h1>Clients</h1>
				<HorizontalLine />
				<Clients agencyId={1}/>

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