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
         username: ''
         , password: ''
         , firstName: ''
         , lastName: ''
         , email: ''
         , phone: ''
         , position: ''
         , agency_id: ''
         , existing_users: []
      }
      this.handleSubmit = this.handleSubmit.bind(this);
   }


   componentDidMount() {
      this.setState({
         agency_id: this.props.user.agency_employee_id
      })

      //GET LIST OF EXISTING USERS
      axios.get(`/api/get-users?agencyId=${this.props.user.agency_employee_id}`).then(result => {
         this.setState({existing_users: result.data})
      })
   }


   handleSubmit(e) {
      e.preventDefault();
      axios.post(`/api/create-user`, this.state).then(result => {
         console.log(result);
      });
      
   }

   render() {

      let {username, password, firstName, lastName, email, phone, position} = this.state;
      const {existing_users} = this.state;

      const existing_users_content = existing_users.map(e => 
         <div className="existing-user-row" key={e.username}>
            <span><span>Name:</span> {`${e.first_name} ${e.last_name}`}</span>
            <span><span>Username:</span> {e.username}</span>
            <span><span>Email:</span> {e.email}</span>
         </div>
      );
      console.log(existing_users_content);

      return(
         <div className="users-parent-container">
            
            <div className="existing-users-parent-container">
               <h1>Existing Users</h1>
               <div className="existing-users-child-container">
                  {existing_users_content}
               </div>
            </div>
            
            <div className="create-new-user-parent-container">
               <h1>Create New User</h1>
               <div className="create-new-user-child-container">
                  <form className="create-new-user-form" onSubmit={this.handleSubmit}>
                     <span>Username:</span>
                     <input 
                        type="text"
                        value={username}
                        onChange={e => this.setState({username: e.target.value})} />
                     <span>Password:</span>
                     <input 
                        type="text" 
                        value={password}
                        onChange={e => this.setState({password: e.target.value})} />
                     <span>First Name:</span>
                     <input 
                        type="text"
                        value={firstName}
                        onChange={e => this.setState({firstName: e.target.value})} />
                     <span>Last Name:</span>
                     <input 
                        type="text"
                        value={lastName}
                        onChange={e => this.setState({lastName: e.target.value})} />
                     <span>Email:</span>
                     <input
                        type="text"
                        value={email}
                        onChange={e => this.setState({email: e.target.value})} />
                     <span>Phone:</span>
                     <input 
                        type="text"
                        value={phone}
                        onChange={e => this.setState({phone: e.target.value})} />
                     <span>Position:</span>
                     <input 
                        type="text"
                        value={position}
                        onChange={e => this.setState({position: e.target.value})} />
                     <button>Create User</button>
                  </form>

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