//Modules
import React from 'react';

//CSS
import './Login.css'

//Components
import LoginForm from '../../components/LoginForm/LoginForm.js'
import Loading from '../../components/Loading/Loading.js';

export default class LoginView extends React.Component {
  constructor() {
    super()
    this.state = {
      loginStatus: false
    }
    this.checkLogin = this.checkLogin.bind(this);
  }

  checkLogin() {
    this.setState({loginStatus: true})
  }
  
  render() {

    const {loginStatus} = this.state;

    return (
      <div className="login-page">
        {loginStatus === false 
          ? 
          <LoginForm loginStatus={this.checkLogin} /> 
          : 
          <Loading history={this.props.history} />}
      </div>
    )
  }
}