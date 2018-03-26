//COMPONENTS
import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';

//CSS, ASSETS
import './ClientDetails.css';

//COMPONENTS
export default class ClientDetails extends React.Component {
   constructor() {
      super()
      this.state = {
         profile: {
            client_name: ''
            , url: ''
            , phone: ''
            , street_address: ''
            , city: ''
            , state_province: ''
            , zip: ''
            , country: ''
            , client_id: ''
         },
         editStatus: false,
         updateStatus: ''
      }

      this.handleEdit = this.handleEdit.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
   }

   componentWillMount() {
      axios.get(`/api/client-profile/${this.props.clientId}`).then(result => 
         this.setState({profile: result.data[0]}))
   }

   handleEdit() {
      //ENABLE INPUT FIELDS
      const fields = Array.from(document.getElementsByClassName('client-details-input'));
      fields.map(e => e.removeAttribute('disabled'));

      //SET editStatus TO true
      this.setState({editStatus: true});

      //SET updateStatus TO ''
      this.setState({updateStatus: ''})
   }

   handleUpdate() {
      //DISABLE INPUT FIELDS
      const fields = Array.from(document.getElementsByClassName('client-details-input'));
      fields.map(e => e.setAttribute('disabled', 'true'));

      //SET editStatus TO false
      this.setState({editStatus: false});

      //UPDATE DATABASE
      const profile = this.state.profile;
      axios.put('/api/update-client', {profile}).then(result => 
         this.setState({updateStatus: result.status}));
   }

   handleCancel() {
      //DISABLE INPUT FIELDS
      const fields = Array.from(document.getElementsByClassName('client-details-input'));
      fields.map(e => e.setAttribute('disabled', 'true'));

      //SET editStatus TO false
      this.setState({editStatus: false});

      //REDOWNLOAD CLIENT DETAILS
      axios.get(`/api/client-profile/${this.props.clientId}`).then(result => 
         this.setState({profile: result.data[0]}))
   }


   render() {

      const {client_name, url, phone, sign_up_date, street_address, 
         city, state_province, zip, country} = this.state.profile;
      const {editStatus} = this.state;

      return(
         <div className="client-details">
            {this.state.updateStatus !== '' ? <div className="update-status">Update Successful</div> : ''}
            <div className="columns-container">
               <div className="column-1">
                  <span>
                     <label>Name:</label>
                     <input className='client-details-input' value={client_name} disabled 
                        onChange={e => {
                           const profile = Object.assign({}, this.state.profile)
                           profile.client_name = e.target.value;
                           this.setState({profile})
                        }}
                     />
                  </span>
                  <span>
                     <label>URL: </label>
                     <input className='client-details-input' value={url} disabled
                        onChange={e => {
                           const profile = Object.assign({}, this.state.profile)
                           profile.url = e.target.value;
                           this.setState({profile})
                        }}
                     />
                  </span>
                  <span>
                     <label>Phone: </label>
                     <input className='client-details-input' value={phone} disabled
                        onChange={e => {
                           const profile = Object.assign({}, this.state.profile)
                           profile.phone = e.target.value;
                           this.setState({profile})
                        }}
                     />
                  </span>
               </div>
               <div className="column-2">
                  <span>
                     <label>Address:</label>
                     <input className='client-details-input'value={street_address} disabled
                        onChange={e => {
                           const profile = Object.assign({}, this.state.profile)
                           profile.street_address = e.target.value;
                           this.setState({profile})
                        }}
                     />
                  </span>
                  <span>
                     <label>City:</label>
                     <input className='client-details-input' value={city} disabled
                        onChange={e => {
                           const profile = Object.assign({}, this.state.profile)
                           profile.city = e.target.value;
                           this.setState({profile})
                        }}
                     />
                  </span>
                  <span>
                     <label>State:</label>
                     <input className='client-details-input' value={state_province} disabled
                        onChange={e => {
                           const profile = Object.assign({}, this.state.profile)
                           profile.state_province = e.target.value;
                           this.setState({profile})
                        }}
                     />
                  </span>
               </div>
               <div className="column-3">
                  <span>
                     <label>Zip:</label>
                     <input className='client-details-input' value={zip} disabled
                        onChange={e => {
                           const profile = Object.assign({}, this.state.profile)
                           profile.zip = e.target.value;
                           this.setState({profile})
                        }}
                     />
                  </span>
                  <span>
                     <label>Country:</label>
                     <input className='client-details-input' value={country} disabled
                        onChange={e => {
                           const profile = Object.assign({}, this.state.profile)
                           profile.country = e.target.value;
                           this.setState({profile})
                        }}
                     />
                  </span>
                  <span>
                     <label>Sign Up Date:</label>
                     <span className="shift">
                        <Moment format="MM-DD-YYYY">{sign_up_date}</Moment>
                     </span>
                  </span>
               </div>
            </div>

            {editStatus === false ?
               <div className="button-container">
                  <a className='edit' onClick={this.handleEdit}>Edit</a>
               </div>
               :
               <div className="button-container">
                  <a className='cancel' onClick={this.handleCancel}>Cancel</a>
                  <a className='update' onClick={this.handleUpdate}>Update</a>
               </div>
               }

         </div>
      )
   }
}