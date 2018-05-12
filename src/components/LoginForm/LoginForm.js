//MODULES
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

//CSS, ASSETS
import './LoginForm.css';
import logo from './logo.png';
import eyeOn from './eye-on.svg';
import eyeOff from './eye-off.svg';
import {getUser} from '../../redux/reducer.js';

//COMPONENT
class Login extends React.Component {
   constructor() {
      super()
      this.state = {
         username: '',
         password: '',
         status: '',
         passwordVisible: 'false'
      }
      this.handleLogin = this.handleLogin.bind(this);
      this.passwordVisibility = this.passwordVisibility.bind(this);
   }

   componentWillUnmount() {
    this.props.getUser();
   }

   handleLogin(e) {
    e.preventDefault();
    let {username, password} = this.state;
    username = username.toLowerCase();
    let usernameField = document.querySelector('#username');
    let passwordField = document.querySelector('#password');

    //Reset Status And Warnings
    this.setState({status: ''});
    usernameField.classList.remove('warn');
    usernameField.removeAttribute('placeholder');
    passwordField.classList.remove('warn');
    passwordField.removeAttribute('placeholder');

    //Validation
    let flag = true;
    if(!username) {
      flag = false;
      usernameField.classList.add('warn');
      usernameField.setAttribute('placeholder','Username Required')
    }

    if(!password) {
      flag = false;
      passwordField.classList.add('warn');
      passwordField.setAttribute('placeholder','Password Required')
    }

    //Check Authorization
    if(flag) {
      axios.post('/api/login', {username, password}).then(res => {
        if(res.data === 'Unauthorized') {
            this.setState({
              status: res.data
            })
        }
        this.props.history.push(res.headers.location) //REDIRECT IF LOGIN SUCCESS
      })
    }
  }

  passwordVisibility() {
    let update = !this.state.passwordVisible;
    this.setState({passwordVisible: update});
    
    //Update Password Visibility
    if(update) {
      document.getElementById('password').setAttribute('type', 'password')
    } else {
      document.getElementById('password').setAttribute('type', 'text')
    }
  }  

  render() {

    let {username, password, status, passwordVisible} = this.state;

    return (
      <div className="login-container">

        <div className="logo-container">
          <h1>WhiteLabel</h1>
          <img src={logo} alt="Tesseract"/>
        </div>
      
        <div className="login-status-div">{status && <div className='login-status'>{status}</div>}</div>

        <form className="login-fields-container" onSubmit={this.handleLogin}>
          <div className="login-field-container">
              <span>Username</span>
              <input 
                type="text"
                id="username"
                className="login-field"
                value={username}
                onChange={e => this.setState({username: e.target.value})}
              />
          </div>

          <div className="login-field-container">
              <span>Password</span>
              <input
                type="password"
                id="password"
                className="login-field"
                value={password}
                onChange={e => this.setState({password: e.target.value})}
              />
              <img
                className='eye'
                src={passwordVisible ? eyeOn : eyeOff}
                onClick={this.passwordVisibility}
                title={passwordVisible ? 'Show Password' : 'Hide Password'}
                alt={passwordVisible ? 'Show Password' : 'Hide Password'}
                />
          </div>

          <button className="login-button">Log In</button>
            
        </form>
      </div>
    )
  }
}


function mapStateToProps(state) {
   return {}
}

export default connect(mapStateToProps, {getUser})(Login)