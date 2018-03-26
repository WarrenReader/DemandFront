//MODULES
import React from 'react';
import axios from 'axios';

//CSS, ASSETS
import './EditUser.css';

//COMPONENT
export default class ExitUser extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         user: {
            username: ''
            , first_name: ''
            , last_name: ''
            , email: ''
            , phone: ''
            , position: ''
            , agency_employees_id: ''
         },
         status: ''
      }

      this.handleSave = this.handleSave.bind(this)
      this.handleCancel = this.handleCancel.bind(this)
   }


   componentWillReceiveProps() {
      this.setState({user: this.props.user})
   }


   handleSave() {
      //RESET STATUS
      this.setState({status: ''})

      const user = this.state.user;
      axios.put('/api/update-user', {user}).then(result => {
         this.setState({status: result.status})
      })
   }


   handleCancel() {
      //CLEAR USER INPUTS
      const user = this.state.user;
      user.username = '';
      user.first_name = '';
      user.last_name = '';
      user.email = '';
      user.phone = '';
      user.position = '';
      user.agency_employees_id = '';
      this.setState({user});

      //RESET STATUS
      this.setState({status: ''})
   }


   render() {

      let {username, first_name, last_name, email} = this.state.user;

      return(
         <div className="edit-user-table">
            {this.state.status !== '' ? <div className="status">Update Successful</div> : ''}
            <table>
               <thead>
                  <tr>
                     <th>Username</th>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Email</th>
                     <th>Action</th>
                  </tr>
               </thead>

            {this.state.user.username !== '' ?
               <tbody>
                  <tr>
                     <td>
                        <input
                           type="text"
                           value={username} 
                           onChange={e => {
                              const user = Object.assign({}, this.state.user);
                              user.username = e.target.value;
                              this.setState({user})
                           }}
                        />
                     </td>
                     <td>
                        <input 
                           type="text"
                           value={first_name}
                           onChange={e => {
                              const user = Object.assign({}, this.state.user);
                              user.first_name = e.target.value;
                              this.setState({user})
                           }}
                        />
                     </td>
                     <td>
                        <input
                           type="text"
                           value={last_name}
                           onChange={e => {
                              const user = Object.assign({}, this.state.user);
                              user.last_name = e.target.value;
                              this.setState({user})
                           }}
                        />
                     </td>
                     <td>
                        <input
                           type="text"
                           value={email}
                           onChange={e => {
                              const user = Object.assign({}, this.state.user);
                              user.email = e.target.value;
                              this.setState({user})
                           }}
                        />
                     </td>
                     <td>
                        <button type="text"
                        className="update" onClick={this.handleSave}>Update</button>
                        <button type="text"  
                        className="cancel" onClick={this.handleCancel}>Cancel</button>
                     </td>
                  </tr>
               </tbody>
               : 
               <tbody>
                  <tr>
                     <td className="edit-prompt">Select A User Above To Edit</td>
                  </tr>
               </tbody>}
               
            </table>
         </div>
      )
   }
}