import React from 'react';
import {connect} from 'react-redux';
// import {getUser} from '../../redux/reducer.js';
import './Dashboard.css';
import Header from '../Header/Header.js';

export default class Dashboard extends React.Component {

   // componentDidMount() {
   //    this.props.getUser();
   // }

   
   render() {
      return(
         <div>
            <Header />
         </div>
      )
   }
}

// function mapStateToProps(state) {
//    return {
//       user: state.user
//    }
// }

// export default connect(mapStateToProps, {getUser})(Dashboard);