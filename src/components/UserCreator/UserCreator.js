import React from 'react';
import './UserCreator.css';
import Logo from './logo.png';
import axios from 'axios';

export default class UserCreator extends React.Component {
   constructor() {
      super()
      this.state = {
         username: '',
         password: '',
         status: ''
      }

      this.handleFormSubmit = this.handleFormSubmit.bind(this);
   }

   handleFormSubmit(e) {
      e.preventDefault();
      let {username, password} = this.state;
      username = username.toLowerCase();

      axios.post('/api/create-user', {username, password}).then(res => {
         if(res.data.status) {
            console.log(res);
            this.setState({
               status: "User Not Created"
            })
         } else {
            console.log(res);
            this.setState({
               status: "User Created"
            })
         }
      })
   }

   render() {

      let {username, password, status} = this.state;

      return(
         <div className="create-user-parent-container">
            <div className="login-child-container">

               <img src={Logo} alt="Logo" className="create-user-logo"/>

               <form className="login-fields-container" onSubmit={this.handleFormSubmit}>
                  {status && <div className="user-created-status raleway">{status}</div>}
                  <div className="login-field-container raleway">
                     <span className="login-field-title raleway">New Username</span>
                     <input 
                        type="text"
                        className="login-field raleway"
                        value={username}
                        onChange={e => this.setState({username: e.target.value})}
                     />
                  </div>

                  <div className="login-field-container raleway">
                     <span className="login-field-title raleway">New Password</span>
                     <input
                        type="password"
                        className="login-field raleway"
                        value={password}
                        onChange={e => this.setState({password: e.target.value})}
                     />
                  </div>

                  <button className="login-button">
                     <span className="login-text raleway">Create User</span>
                  </button>
                  
               </form>

            </div>

         </div>
      )
   }
}