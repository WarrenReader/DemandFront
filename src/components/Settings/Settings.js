//MODULES
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

//CSS, ASSETS
import './Settings.css';
import {getUser} from '../../redux/reducer.js';

//COMPONENT
class Settings extends React.Component {
   constructor() {
      super()
      this.state = {
			edit: false
			, user: {
				user_id: ''
				, agency_employee_id: ''
				, username: ''
				, first_name: ''
				, last_name: ''
				, email: ''
				, phone: ''
				, position: ''
			}
		}
		
      this.handleEditButton = this.handleEditButton.bind(this);
      this.handleSaveButton = this.handleSaveButton.bind(this);
   }

	componentWillMount() {
		axios.get('/auth/me').then(res => {
			this.setState({user: res.data})
		})
	}

   handleEditButton() {
      this.setState((prevState) => {
         return {edit: !prevState.edit}
      })

      let inputFields = Array.from(document.getElementsByTagName('input'));

      inputFields.forEach(e => e.removeAttribute("disabled"));

   }

   handleSaveButton() {
      this.setState((prevState) => {
         return {edit: !prevState.edit}
      })

      let inputFields = Array.from(document.getElementsByTagName('input'));

		inputFields.forEach(e => e.setAttribute("disabled", 'true'));
		
		const user = this.state.user;

		axios.put('/api/update-user', {user})

		this.props.getUser();

   }


   render() {

         const {first_name, last_name, email, phone, position} = this.state.user;
			const {edit} = this.state;

      return(
         <div className="settings-parent-container">
            <div className="settings-child-container">
					<h1>Settings</h1>
					<div className="settings-inner-container">
	
						<span>First Name</span>
						<input
							type="text"
							value={first_name}
							className="input-field"
							onChange={e => {
								let user = Object.assign({}, this.state.user);
								user.first_name = e.target.value;
								this.setState({user})
								}
							}
							disabled />

						<span>Last Name</span>
						<input
							type="text"
							value={last_name}
							className="input-field"
							onChange={e => {
								let user = Object.assign({}, this.state.user);
								user.last_name = e.target.value;
								this.setState({user})
								}
							}
							disabled />


						<span>Email</span>
						<input
							type="text"
							value={email}
							className="input-field"
							onChange={e => {
								let user = Object.assign({}, this.state.user);
								user.email = e.target.value;
								this.setState({user})
								}
							}
							disabled />

						<span>Phone</span>
						<input
						type="text"
						value={phone}
						className="input-field"
						onChange={e => {
							let user = Object.assign({}, this.state.user);
							user.phone = e.target.value;
							this.setState({user})
							}
						}
						disabled />

						<span>Position</span>
						<input
							type="text"
							value={position}
							className="input-field"
							onChange={e => {
								let user = Object.assign({}, this.state.user);
								user.position = e.target.value;
								this.setState({user})
								}
							}
							disabled />


						{edit === false ? 
							<button className="settings-edit-button" onClick={this.handleEditButton}>Edit</button> :
							<button className="settings-save-button" onClick={this.handleSaveButton}>Save</button>}


               </div>
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