//MODULES
import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

//CSS, ASSETS
import './Users.css';

//COMPONENT
class Users extends React.Component {
   constructor(){
      super()
      this.state = {
         editUserStatus: false
         , existing_users: []
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
      this.handleEditUser = this.handleEditUser.bind(this);
      this.handleDeleteUser = this.handleDeleteUser.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleSaveChanges = this.handleSaveChanges.bind(this);
      this.handleCreateNewUser = this.handleCreateNewUser.bind(this);
      this.handleUserUpdate = this.handleUserUpdate.bind(this);
   }


   componentDidMount() {
		//ADD AGENCY ID TO newUser
		const newUser = Object.assign({}, this.state.newUser);
		newUser.agencies_id = this.props.user.agencies_id;
		this.setState({newUser})

      //GET LIST OF EXISTING USERS
      axios.get(`/api/get-users?agencyId=${this.props.user.agency_employees_id}`).then(result => {
         this.setState({existing_users: result.data})
      })
   }


   handleEditUser() {
      if(this.state.editUser.username !== '') {
         this.setState((prevState) => {
            return {editUserStatus: !prevState.editUserStatus}
         })
   
         //REMOVE DISABLED FROM EDIT USER INPUTS
         const editUserInputs = Array.from(document.getElementsByClassName('edit-user-input'));
			editUserInputs.forEach(e => e.removeAttribute("disabled"));
			
			//UPDATE editUserStatusResponse ON STATE
			this.setState({editUserStatusResponse: ''})
      }
   }


   handleDeleteUser() {
      //NOT ACTIVE AS I NEED TO FIGURE OUT HOW TO REASSIGN TASKS

      // let response = prompt('Type "DELETE" to confirm.');

      // if(response === "DELETE") {
      //    const {agency_employees_id} = this.state.editUser
      //    axios.put('/api/delete-user', {agency_employees_id}).then(alert('User Deleted.'))
      // } else {
      //    alert('User Not Deleted')
      // }
   }


   handleCancel() {
      this.setState((prevState) => {
         return {editUserStatus: !prevState.editUserStatus}
      })

      //ADD DISABLED TO EDIT USER INPUTS
      const editUserInputs = Array.from(document.getElementsByClassName('edit-user-input'));
      editUserInputs.forEach(e => e.setAttribute('disabled', 'true'));

      //RESET EDIT USER INPUTS
      const editUser = this.state.editUser;
      editUser.username = '';
      editUser.first_name = '';
      editUser.last_name = '';
      editUser.email = '';
      editUser.phone = '';
      editUser.position = '';
      editUser.agency_employees_id = '';
      this.setState({editUser});
   }


   handleSaveChanges() {
      this.setState((prevState) => {
         return {editUserStatus: !prevState.editUserStatus}
      })

      //ADD DISABLED TO EDIT USER INPUTS
      const editUserInputs = Array.from(document.getElementsByClassName('edit-user-input'));
      editUserInputs.forEach(e => e.setAttribute('disabled', 'true'));

      //ENDPOINT
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


   handleUserUpdate(index) {
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


   render() {

      let {editUser, editUserStatus, newUser, editUserStatusResponse, createUserStatusResponse} = this.state;
      const {existing_users} = this.state;

      const existing_users_content = existing_users.map((e, index) => 
         <div className="existing-user-row" key={e.username}>
            <span><span>Name:</span> {`${e.first_name} ${e.last_name}`}</span>
            <span><span>Username:</span> {e.username}</span>
            <span><span>Email:</span> {e.email}</span>
            <a onClick={() => this.handleUserUpdate(index)}>Edit</a>
         </div>
      );

      return(
         <div className="users-parent-container">
            
            <div className="existing-users-parent-container">
               <h1>Existing Users</h1>
               <div className="existing-users-child-container">
                  {existing_users_content}
               </div>
            </div>

            <div className="users-edit-user">
					<h1>Edit User</h1>
					{editUserStatusResponse === 200 ? <div className="edit-user-status">Update Successful</div> : ''}
               <div className="users-edit-user-child">

                  <span>Username</span>
                  <input 
                     placeholder="Select A User To Edit"
                     type="text"
                     value={editUser.username}
                     className="edit-user-input"
                     onChange={e => {
                        const editUser = Object.assign({}, this.state.editUser);
                        editUser.username = e.target.value;
                        this.setState({editUser});
                     }} 
                     disabled />
         
                  <span>First Name</span>
                  <input 
                     type="text"
                     value={editUser.first_name}
                     className="edit-user-input"
                     onChange={e => {
                        const editUser = Object.assign({}, this.state.editUser);
                        editUser.first_name = e.target.value;
                        this.setState({editUser});
                     }} 
                     disabled />

                  <span>Last Name</span>
                  <input 
                     type="text"
                     value={editUser.last_name}
                     className="edit-user-input"
                     onChange={e => {
                        const editUser = Object.assign({}, this.state.editUser);
                        editUser.last_name = e.target.value;
                        this.setState({editUser});
                     }} 
                     disabled />

                  <span>Email</span>
                  <input
                     type="text"
                     value={editUser.email}
                     className="edit-user-input"
                     onChange={e => {
                        const editUser = Object.assign({}, this.state.editUser);
                        editUser.email = e.target.value;
                        this.setState({editUser});
                     }}  
                     disabled />

                  <span>Phone</span>
                  <input 
                     type="text"
                     value={editUser.phone}
                     className="edit-user-input"
                     onChange={e => {
                        const editUser = Object.assign({}, this.state.editUser);
                        editUser.phone = e.target.value;
                        this.setState({editUser});
                     }} 
                     disabled />

                  <span>Position</span>
                  <input 
                     type="text"
                     value={editUser.position}
                     className="edit-user-input"
                     onChange={e => {
                        const editUser = Object.assign({}, this.state.editUser);
                        editUser.position = e.target.value;
                        this.setState({editUser});
                     }} 
                     disabled />

                     {editUserStatus === false ?
                     <div className="users-edit-user-button-container">
                        <button className="delete-button" onClick={this.handleDeleteUser}>Delete User</button>
                        <button className="edit-button" onClick={this.handleEditUser}>Edit User</button>
                     </div>
                     :
                     <div className="users-edit-user-button-container">
                        <button className="cancel-button" onClick={this.handleCancel}>Cancel</button>
                        <button className="save-button" onClick={this.handleSaveChanges}>Save Changes</button>
                     </div>
                     }

               </div>
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