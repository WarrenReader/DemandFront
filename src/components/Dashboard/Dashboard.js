//MODULES
import React from 'react';

//CSS, ASSETS
import './Dashboard.css';

//COMPONENTS
import Header from '../Header/Header.js';

//COMPONENT
const Dashboard = (props) => {
	return(
		<div>
			<Header view="dashboard" history={props.history}/>
			Dashboard
		</div>
	)

}

export default Dashboard;