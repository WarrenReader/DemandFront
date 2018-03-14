//MODULES
import React from 'react'
import {connect} from 'react-redux';

//CSS, ASSETS
import './Settings.css';

//COMPONENT
class Settings extends React.Component {
   constructor() {
      super()
      this.state = {
         edit: false
      }

      this.handleEditButton = this.handleEditButton.bind(this);
      this.handleSaveButton = this.handleSaveButton.bind(this);
   }

   handleEditButton() {
      this.setState((prevState) => {
         return {edit: !prevState.edit}
      })

      let inputFields = Array.from(document.getElementsByTagName('input'));

      inputFields.forEach(e => e.removeAttribute("disabled"));

   }

   handleSaveButton() {
      this.setState((prevState) => {
         return {edit: !prevState.edit}
      })

      let inputFields = Array.from(document.getElementsByTagName('input'));

      inputFields.forEach(e => e.setAttribute("disabled", 'true'));

   }


   render() {

         const {username, first_name} = this.props.user;
         const {edit} = this.state;

      return(
         <div className="settings-parent-container">
            <h1>Settings</h1>
            <div className="settings-child-container">
            <span>Username</span>
            <input type="text" value={username} className="input-field" disabled/>


            <span>First Name</span>
            <input type="text" value={first_name} className="input-field" disabled/>


            {edit === false ? 
               <button className="settings-edit-button" onClick={this.handleEditButton}>Edit</button> :
               <button className="settings-save-button" onClick={this.handleSaveButton}>Save</button>}



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

export default connect(mapStateToProps)(Settings)