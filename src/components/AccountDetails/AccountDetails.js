//MODULES
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

//CSS, ASSETS
import './AccountDetails.css';
import {getUser} from '../../redux/reducer.js';

//COMPONENTS
import HorizontalLine from '../Assets/HorizontalLine/HorizontalLine.js';
import InputRow from '../Assets/InputRow/InputRow.js';
import SaveButton from '../Assets/SaveButton/SaveButton.js';

//COMPONENT
class AccountDetails extends React.Component {
  constructor() {
    super()
    this.state = {
    status: ''
    , user: {
      first_name: ''
      , last_name: ''
      , email: ''
      , position: ''
      , user_id: '' 
      }
    }

  this.handleSaveButton = this.handleSaveButton.bind(this);
  this.updateInputField = this.updateInputField.bind(this);
  }

	componentDidMount() {
    this.setState({user: this.props.user})
  }

  updateInputField(e) {
    
  }

  handleSaveButton() {
    //Resets 'Update Successful' Message
    this.setState({status: ''})

    //Push Update To Database
    let user = this.state.user;
    axios.put('/api/update-user', {user}).then(result => {
      this.setState({status: result.status})
      //Update Redux Store
      this.props.getUser();
    })  
  }

  render() {
    const {status} = this.state;
    const {first_name, last_name, email, position} = this.state.user;

    return(
			<div className="account-parent">
				<h1>Account Details</h1>
				<HorizontalLine />

				<div className="account-child">

          <InputRow 
            name="First Name"
						value={first_name}
						onChange={(e) => {
              let first_name = e.target.value;
              let user = {...this.state.user, first_name};
              this.setState({user});
            }}
					/>

					<InputRow 
						name="Last Name"
            value={last_name}
            onChange={(e) => {
              let last_name = e.target.value;
              let user = {...this.state.user, last_name};
              this.setState({user});
            }}
					/>

					<InputRow 
						name="Email"
            value={email}
            onChange={(e) => {
              let email = e.target.value;
              let user = {...this.state.user, email};
              this.setState({user});
            }}
          />
          
					<InputRow 
						name="Position"
						value={position}
            onChange={(e) => {
              let position = e.target.value;
              let user = {...this.state.user, position};
              this.setState({user});
            }}
					/>
            
					<SaveButton name="Update" onClick={this.handleSaveButton} />

          {status === 200 ? <div className="update-status">Update Successful</div> : ''}

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

export default connect(mapStateToProps, {getUser})(AccountDetails)