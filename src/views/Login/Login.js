//Modules
import React from 'react';

//CSS
import './Login.css'

//Components
import LoginForm from '../../components/LoginForm/LoginForm.js'

export default function(props) {
  return (
    <div className="login-page">
      <LoginForm history={props.history}/>
    </div>
  )
}