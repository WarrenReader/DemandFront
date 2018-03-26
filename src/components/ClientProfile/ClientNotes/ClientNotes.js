//MODULES
import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';

//CSS, ASSETS
import './ClientNotes.css';

//COMPONENT
export default class ClientNotes extends React.Component {
   constructor() {
      super()
      this.state = {
         notes: []
      }
   }


   componentWillMount() {
      axios.get(`/api/client-notes/${this.props.clientId}`).then(result =>
         this.setState({notes: result.data}))
   }

   render() {

      const {notes} = this.state;

      const existingNotes = notes.map((e, index) => 
			<tr key={index}>
					<td><Moment format="MM-DD-YYYY">{e.created_on}</Moment></td>
					<td>{e.note}</td>
					<td>
					<button className="edit">Edit</button>
					<button className="delete">Delete</button>
					</td>
			</tr>
      )


      return(
         <div className="client-notes-table">

            <table>         
               <thead>
                  <tr>
                     <th>Date</th>
                     <th>Note</th>
                     <th>Action</th>
                  </tr>
               </thead>

               <tbody>
                  {existingNotes}
               </tbody>
            </table>

         </div>
      )
   }
}