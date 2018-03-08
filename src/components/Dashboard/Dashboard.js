//MODULES
import React from 'react';

//CSS, ASSETS
import './Dashboard.css';

//IMPORT COMPONENTS
import Header from '../Header/Header.js';

//COMPONENT
const Dashboard = (props) => {
      return(
         <div>
				<Header view="dashboard" history={props.history}/>
         </div>
      )

}

export default Dashboard;