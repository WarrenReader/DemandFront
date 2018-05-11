//MODULES
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

//CSS, ASSETS
import './LoginForm.css';
import logo from './logo.png';
import {hideHeader, showHeader, getUser} from '../../redux/reducer.js';

//COMPONENT
class Login extends React.Component {
   constructor() {
      super()
      this.state = {
         username: '',
         password: '',
         status: ''
      }
      this.handleLogin = this.handleLogin.bind(this);
   }

   componentWillMount() {
      this.props.hideHeader();
   }

   componentWillUnmount() {
      this.props.showHeader();
      this.props.getUser();
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

      return (
        <div className="login-container">

          <div className="logo-container">
            <h1>WhiteLabel</h1>
            <img src={logo} alt="Logo"/>
          </div>
        
          <form className="login-fields-container" onSubmit={this.handleLogin}>
              
              <div className="login-field-container">
                  <span>Username</span>
                  <input 
                    type="text"
                    className="login-field"
                    value={username}
                    onChange={e => this.setState({username: e.target.value})}
                  />
              </div>

              <div className="login-field-container">
                  <span>Password</span>
                  <input
                    type="password"
                    className="login-field"
                    value={password}
                    onChange={e => this.setState({password: e.target.value})}
                  />
              </div>

              <button className="login-button">Login</button>
              
            </form>
        </div>
      )
   }
}


function mapStateToProps(state) {
   return {
      headerVisibility: state.headerVisibility
   }
}

export default connect(mapStateToProps, {hideHeader, showHeader, getUser})(Login)