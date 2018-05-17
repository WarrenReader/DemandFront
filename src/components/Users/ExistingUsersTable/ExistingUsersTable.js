//MODULES
import React from 'react';
import {connect} from 'react-redux';

//CSS, ASSETS
import './ExistingUsersTable.css';

//COMPONENT
class ExistingUsersTable extends React.Component {

   render() {

      const {users} = this.props;

      const existingUsersData = users.map((e, index) =>
         <tr key={index}>
            <td>{e.username}</td>
            <td>{e.first_name}</td>
            <td>{e.last_name}</td>
            <td>{e.email}</td>
            <td>
               <button className="edit" onClick={() => this.props.onClick(index)}>Edit</button>
               <button className="delete" onClick={() => this.props.handleDelete(index)}>Delete</button>
            </td>
         </tr>
         );			

      return(
         <div className="existing-users-table">

            <table>         
               <thead>
                  <tr>
                     <th>Username</th>
                     <th>First Name</th>
                     <th>Last Name</th>
                     <th>Email</th>
                     <th>Action</th>
                  </tr>
               </thead>

               <tbody>
                  {existingUsersData}
               </tbody>
            </table>

         </div>
      )
   }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(ExistingUsersTable)