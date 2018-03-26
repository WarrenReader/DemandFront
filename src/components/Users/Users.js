	//MODULES
	import React from 'react';
	import {connect} from 'react-redux';
	import axios from 'axios';

	//CSS, ASSETS
	import './Users.css';

	//COMPONENTS
	import HorizontalLine from '../Assets/HorizontalLine/HorizontalLine.js';
	import ExistingUsersTable from './ExistingUsersTable/ExistingUsersTable.js';
	import EditUser from './EditUser/EditUser.js';
	import CreateUser from './CreateUser/CreateUser.js';

	//COMPONENT
	class Users extends React.Component {
		constructor(){
			super()
			this.state = {
				existing_users: []
				, editUser: {
					username: ''
					, first_name: ''
					, last_name: ''
					, email: ''
					, phone: ''
					, position: ''
					, agency_employees_id: ''
				},
				deleteStatus: ''
			}

			this.handleEditUser = this.handleEditUser.bind(this);
			this.handleDelete = this.handleDelete.bind(this);
		}


		componentDidMount() {
			//GET LIST OF EXISTING USERS
			axios.get(`/api/get-users?agencyId=${this.props.user.agency_employees_id}`).then(result => {
				this.setState({existing_users: result.data})
			})
		}


		handleEditUser(index) {
			const selectedUser = this.state.existing_users[index];
			const editUser = this.state.editUser;

			//UPDATE editUser ON STATE
			editUser.username = selectedUser.username;
			editUser.first_name = selectedUser.first_name;
			editUser.last_name = selectedUser.last_name;
			editUser.email = selectedUser.email;
			editUser.phone = selectedUser.phone;
			editUser.position = selectedUser.position;
			editUser.agency_employees_id = selectedUser.agency_employees_id
			this.setState({editUser});
		}   


		handleDelete(index) {
			const selectedUser = this.state.existing_users[index];
			const response = prompt(`Type "DELETE" to delete the user ${selectedUser.username}.`)

			//CHECK IF DELETE WAS ENTERED
			if(response === 'DELETE') {
				axios.delete(`/api/delete-user/?agency_employees_id=${selectedUser.agency_employees_id}`).then(result => 
					this.setState({deleteStatus: result.status}))
			
				//UPDATE LIST OF EXISTING USERS
			axios.get(`/api/get-users?agencyId=${this.props.user.agency_employees_id}`).then(result => {
				this.setState({existing_users: result.data})
			})
			}
		}


		render() {

			let {existing_users, editUser, editUserStatusResponse, deleteStatus} = this.state;

			return(
				<div className="users-parent">
					<h1>Existing Users</h1>
					<HorizontalLine />
					<ExistingUsersTable existingUsers={existing_users} 
						onClick={this.handleEditUser} handleDelete={this.handleDelete}/>

						
					<h1>Edit User</h1>
					<HorizontalLine />
					<EditUser
						user={editUser}
					/>


					<h1>Create User</h1>
					<HorizontalLine />
					<CreateUser agenciesId={this.props.user.agencies_id}/>

					{editUserStatusResponse === 200 ? <div className="edit-user-status">Update Successful</div> : ''}
					{deleteStatus === 200 ? <div className="delete-user-status">User Deleted</div> : ''}

				</div>
			)
		}
	}


	function mapStateToProps(state) {
		return {
			user: state.user
		}
	}


	export default connect(mapStateToProps)(Users)