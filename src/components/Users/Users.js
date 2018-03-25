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
				, existingUsers: []
				, editUser: {
					username: ''
					, first_name: ''
					, last_name: ''
					, email: ''
					, phone: ''
					, position: ''
					, agency_employees_id: ''
				}
				, newUser: {
					username: ''
					, password: ''
					, first_name: ''
					, last_name: ''
					, email: ''
					, phone: ''
					, position: ''
					, agencies_id: ''
				}
				, editUserStatusResponse: ''
				, createUserStatusResponse: ''
			}

			this.handleSave = this.handleSave.bind(this);
			this.handleCreateNewUser = this.handleCreateNewUser.bind(this);
			this.handleEditUser = this.handleEditUser.bind(this);
		}


		componentDidMount() {
			//GET LIST OF EXISTING USERS
			axios.get(`/api/get-users?agencyId=${this.props.user.agency_employees_id}`).then(result => {
				this.setState({existing_users: result.data})
			})

			//ADD AGENCY ID TO newUser
			const newUser = Object.assign({}, this.state.newUser);
			newUser.agencies_id = this.props.user.agencies_id;
			this.setState({newUser})
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


		handleSave() {
			//RESET editUserStatusResponse
			this.setState({editUserStatusResponse: ''})

			const user = this.state.editUser;
			axios.put('/api/update-user', {user}).then(result => {
				this.setState({editUserStatusResponse: result.status})
			})
		}



		handleCreateNewUser() {
			const {newUser} = this.state;

			axios.post(`/api/create-user`, newUser).then(result => {
				this.setState({createUserStatusResponse: result.status})
			});
		}





		render() {

			let {existing_users, editUser, editUserStatus, newUser, editUserStatusResponse, createUserStatusResponse} = this.state;

			return(
				<div className="users-parent">
					<h1>Existing Users</h1>
					<HorizontalLine />
					<ExistingUsersTable existingUsers={existing_users} onClick={this.handleEditUser}/>

					
					<h1>Edit User</h1>
					<HorizontalLine />
					<EditUser
						user={editUser}
					/>
					{editUserStatusResponse === 200 ? <div className="edit-user-status">Update Successful</div> : ''}


					<h1>Create User</h1>
					<HorizontalLine />
					<CreateUser />


					

					
					<div className="overflow">
						<table className="create-user-table">
							
							<thead>
								<tr className="table-header">
									<th>Username</th>
									<th>Password</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Action</th>
								</tr>
							</thead>

							<tbody className="table-body">
								<tr className="table-row">
									<td><input type="text" 
											value={newUser.username}
											onChange={e => {
												const newUser = Object.assign({}, this.state.newUser);
												newUser.username = e.target.value;
												this.setState({newUser});}}
									/></td>
									<td><input type="text"  
											value={newUser.password}
											onChange={e => {
												const newUser = Object.assign({}, this.state.newUser);
												newUser.password = e.target.value;
												this.setState({newUser});}}
									/></td>
									<td><input type="text"  
											value={newUser.first_name}
											onChange={e => {
												const newUser = Object.assign({}, this.state.newUser);
												newUser.first_name = e.target.value;
												this.setState({newUser});}}
									/></td>
									<td><input type="text"  
											value={newUser.last_name}
											onChange={e => {
												const newUser = Object.assign({}, this.state.newUser);
												newUser.last_name = e.target.value;
												this.setState({newUser});}}
									/></td>
									<td><input type="text"  
											value={newUser.email}
											onChange={e => {
												const newUser = Object.assign({}, this.state.newUser);
												newUser.email = e.target.value;
												this.setState({newUser});}}
									/></td>
									<td><button type="text"
											className="update" onClick={this.handleSaveChanges}>Update</button>
											<button type="text"  
											className="cancel" onClick={this.handleCancel}>Cancel</button>
									</td>
								</tr>
							</tbody>

						</table>
					</div>
						





					<div className="create-new-user-parent-container">
						<h1>Create New User</h1>
						{createUserStatusResponse === 200 ? <div className="create-user-status">User Created</div> : ''}
						<div className="create-new-user-child-container">
							<div className="create-new-user-form">
								<span>Username</span>
								<input 
									type="text"
									value={newUser.username}
									onChange={e => {
										const newUser = Object.assign({}, this.state.newUser);
										newUser.username = e.target.value;
										this.setState({newUser});
									}}
								/>
								<span>Password</span>
								<input 
									type="password" 
									value={newUser.password}
									onChange={e => {
										const newUser = Object.assign({}, this.state.newUser);
										newUser.password = e.target.value;
										this.setState({newUser});
									}}
									/>
								<span>First Name</span>
								<input 
									type="text"
									value={newUser.first_name}
									onChange={e => {
										const newUser = Object.assign({}, this.state.newUser);
										newUser.first_name = e.target.value;
										this.setState({newUser});
									}}
									/>
								<span>Last Name</span>
								<input 
									type="text"
									value={newUser.last_name}
									onChange={e => {
										const newUser = Object.assign({}, this.state.newUser);
										newUser.last_name = e.target.value;
										this.setState({newUser});
									}}
									/>
								<span>Email</span>
								<input
									type="text"
									value={newUser.email}
									onChange={e => {
										const newUser = Object.assign({}, this.state.newUser);
										newUser.email = e.target.value;
										this.setState({newUser});
									}}
									/>
								<span>Phone</span>
								<input 
									type="text"
									value={newUser.phone}
									onChange={e => {
										const newUser = Object.assign({}, this.state.newUser);
										newUser.phone = e.target.value;
										this.setState({newUser});
									}}
									/>
								<span>Position</span>
								<input 
									type="text"
									value={newUser.position}
									onChange={e => {
										const newUser = Object.assign({}, this.state.newUser);
										newUser.position = e.target.value;
										this.setState({newUser});
									}}
									/>
								<button onClick={this.handleCreateNewUser}>Create User</button>
							</div>

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


	export default connect(mapStateToProps)(Users)