//MODULES
import React from 'react';
import axios from 'axios';

//CSS AND ASSETS
import './Login.css';
import logo from './logo.png';

//COMPONENT
export default class Login extends React.Component {
   constructor() {
      super()
      this.state = {
         username: '',
         password: '',
         status: ''
      }

      this.handleLogin = this.handleLogin.bind(this);
   }

   handleLogin(e) {
      e.preventDefault();
      let {username, password} = this.state;
      username = username.toLowerCase();

      axios.post('/api/login', {username, password}).then(res => {
         if(res.data === 'Unauthorized') {
            this.setState({
               status: res.data
            })
         }
         
         this.props.history.push(res.headers.location) //REDIRECT IF LOGIN SUCCESS

      })  
   }

   render() {

      let {username, password, status} = this.state;

      return(
         <div className="login-parent-container">
            <div className="login-child-container">

               <img src={logo} alt="Logo" className="login-logo"/>

               <form className="login-fields-container" onSubmit={this.handleLogin}>

                  <div className="login-status-div">{status && <div className='login-status raleway'>{status}</div>}</div>

                  <div className="login-field-container raleway">
                     <span className="login-field-title raleway">Username</span>
                     <input 
                        type="text"
                        className="login-field raleway"
                        value={username}
                        onChange={e => this.setState({username: e.target.value})}
                     />
                  </div>

                  <div className="login-field-container raleway">
                     <span className="login-field-title raleway">Password</span>
                     <input
                        type="password"
                        className="login-field raleway"
                        value={password}
                        onChange={e => this.setState({password: e.target.value})}
                     />
                  </div>

                  <button className="login-button">
                     <span className="login-text raleway">Login</span>
                  </button>
                  
               </form>

            </div>

         </div>
      )
   }
}