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
			, first_name: '' //USER INFO STARTS HERE
			, last_name: ''
			, email: ''
			, position: ''
			, user_id: '' 
		}

		this.handleSaveButton = this.handleSaveButton.bind(this);
   }

	componentWillMount() {
    this.setState({
      first_name: this.props.user.first_name
      , last_name: this.props.user.last_name
      , email: this.props.user.email
      , position: this.props.user.position
      , user_id: this.props.user.user_id
    })
  }

   handleSaveButton() {
		//Resets 'Update Successful' Message
		this.setState({status: ''})

		//Add User Details To State From Redux
		const user = {
			first_name: this.state.first_name
			, last_name: this.state.last_name
			, email: this.state.email
			, position: this.state.position
			, user_id: this.state.user_id
		};
		
		axios.put('/api/update-user', {user}).then(result => {
			this.setState({status: result.status})
		})

		this.props.getUser();
   }


   render() {

      const {first_name, last_name, email, position, status} = this.state;

      return(
			<div className="account-parent">
				<h1>Account Details</h1>
				<HorizontalLine />

				<div className="account-child">

					<InputRow 
						name="First Name"
						value={first_name}
						onChange={e => this.setState({first_name: e.target.value})}
					/>

					<InputRow 
						name="Last Name"
						value={last_name}
						onChange={e => this.setState({last_name: e.target.value})}
					/>

					<InputRow 
						name="Email"
						value={email}
						onChange={e => this.setState({email: e.target.value})}
					/>

					<InputRow 
						name="Position"
						value={position}
						onChange={e => this.setState({position: e.target.value})}
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