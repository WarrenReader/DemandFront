//MODULES
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

//CSS, ASSETS
import './Settings.css';
import {getUser} from '../../redux/reducer.js';

//COMPONENTS
import HorizontalLine from '../Assets/HorizontalLine/HorizontalLine.js';
import InputRow from '../Assets/InputRow/InputRow.js';
import SaveButton from '../Assets/SaveButton/SaveButton.js';

//COMPONENT
class Settings extends React.Component {
   constructor() {
      super()
      this.state = {
			status: ''
			, first_name: '' //USER INFO STARTS HERE
			, last_name: ''
			, email: ''
			, phone: ''
			, position: ''
			, user_id: '' 
			, agency_employees_id: ''
			, username: ''
		}

		this.handleSaveButton = this.handleSaveButton.bind(this);
   }


	componentWillMount() {
		axios.get('/auth/me').then(res => {
			this.setState({
				first_name: res.data.first_name,
				last_name: res.data.last_name,
				email: res.data.email,
				phone: res.data.phone,
				position: res.data.position,
				user_id: res.data.user_id,
				agency_employees_id: res.data.agency_employees_id,
				username: res.data.username
			})
		})
	}


   handleSaveButton() {
		//RESETS 'UPDATE SUCCESSFUL' MESSAGE
		this.setState({status: ''})

		//UPDATE USER SETTINGS TO DATABASE AND RETIEVE UPDATED USER PROFILE
		const user = {
			first_name: this.state.first_name
			, last_name: this.state.last_name
			, email: this.state.email
			, phone: this.state.phone
			, position: this.state.position
			, user_id: this.state.user_id
			, agency_employees_id: this.state.agency_employees_id
			, username: this.state.username
		};
		
		axios.put('/api/update-user', {user}).then(result => {
			this.setState({status: result.status})
		})

		this.props.getUser();
   }


   render() {

      const {first_name, last_name, email, phone, position, status} = this.state;

      return(
			<div className="account-parent">
				<h1>Account Details</h1>
				<HorizontalLine />

				<div className="account-child">

					<InputRow 
						name="First Name"
						value={first_name}
						onChange={e => this.setState({first_name: e.target.value})}
					/>

					<InputRow 
						name="Last Name"
						value={last_name}
						onChange={e => this.setState({last_name: e.target.value})}
					/>

					<InputRow 
						name="Email"
						value={email}
						onChange={e => this.setState({email: e.target.value})}
					/>

					<InputRow 
						name="Phone"
						value={phone}
						onChange={e => this.setState({phone: e.target.value})}
					/>

					<InputRow 
						name="Position"
						value={position}
						onChange={e => this.setState({position: e.target.value})}
					/>
            
					<SaveButton name="Update" onClick={this.handleSaveButton} />

					{status === 200 ? <div className="update-status">Update Successful</div> : ''}

            </div>
         </div>
      )
   }
}


function mapStateToProps(state) {
   return {
   }
}

export default connect(mapStateToProps, {getUser})(Settings)