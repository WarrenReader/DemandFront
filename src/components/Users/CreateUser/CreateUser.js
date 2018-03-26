//MODULES
import React from 'react';
import axios from 'axios';

//CSS, ASSETS
import './CreateUser.css';

//COMPONENT
export default class CreateUser extends React.Component {
   constructor() {
      super()
      this.state = {
         newUser: {
            username: ''
            , password: ''
            , first_name: ''
            , last_name: ''
            , email: ''
            , agencies_id: ''
         }
         , status: ''
      }

      this.handleCreateNewUser = this.handleCreateNewUser.bind(this)
      this.handleClear = this.handleClear.bind(this)
   }


   componentWillMount() {
      //ASSIGN agencies_id TO newUser ON STATE
      const newUser = Object.assign({}, this.state.newUser);
      newUser.agencies_id = this.props.agenciesId;
      this.setState({newUser});
   }


   handleCreateNewUser() {
      const {newUser} = this.state;
      axios.post(`/api/create-user`, newUser).then(result => {
         this.setState({status: result.status});
      
         //REFRESH EXISTING USERS TABLE
         this.props.refresh();
      });

   }


   handleClear() {
      const newUser = Object.assign({}, this.state.newUser);
      newUser.username = '';
      newUser.password = '';
      newUser.first_name = '';
      newUser.last_name = '';
      newUser.email = '';
      this.setState({newUser});

      //UPDATE status ON STATE
      this.setState({status: ''})
   }


   render() {

      const {username, password, first_name, last_name, email} = this.state.newUser

      return(
         <div className="create-user-table">
            {this.state.status !== '' ? <div className="status">User Created</div> : ''}
            <table>  
               <thead>
                  <tr>
                     <th>Username</th>
                     <th>Password</th>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Email</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>
                        <input 
                           type="text" 
                           value={username}
                           onChange={e => {
                              const newUser = Object.assign({}, this.state.newUser);
                              newUser.username = e.target.value;
                              this.setState({newUser})
                           }}
                        />
                     </td>
                     <td>
                        <input 
                           type="password" 
                           value={password}
                           onChange={e => {
                              const newUser = Object.assign({}, this.state.newUser);
                              newUser.password = e.target.value;
                              this.setState({newUser})
                           }}
                        />
                     </td>
                     <td>
                        <input 
                           type="text" 
                           value={first_name}
                           onChange={e => {
                              const newUser = Object.assign({}, this.state.newUser);
                              newUser.first_name = e.target.value;
                              this.setState({newUser})
                           }}
                        />
                     </td>
                     <td>
                        <input 
                           type="text" 
                           value={last_name}
                           onChange={e => {
                              const newUser = Object.assign({}, this.state.newUser);
                              newUser.last_name = e.target.value;
                              this.setState({newUser})
                           }}
                        />
                     </td>
                     <td>
                        <input 
                           type="text" 
                           value={email}
                           onChange={e => {
                              const newUser = Object.assign({}, this.state.newUser);
                              newUser.email = e.target.value;
                              this.setState({newUser})
                           }}
                        />
                     </td>
                     <td>
                        <button 
                           type="text"
                           className="update" 
                           onClick={this.handleCreateNewUser}>Update</button>
                        <button 
                           type="text"  
                           className="cancel" 
                           onClick={this.handleClear}>Clear</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      )
   }
}