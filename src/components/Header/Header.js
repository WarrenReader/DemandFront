import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer.js';
import './Header.css';
import logo from './logo.png';


class Header extends React.Component {

   componentDidMount() {
      this.props.getUser();
   }

   render() {

      const {first_name: firstName = '', last_name: lastName = ''} = this.props.user;
      console.log(this.props.user);

      return (
               <header className="header">
                  <img src={logo} alt="logo" className="header-logo" />
                  <input className="menu-btn" type="checkbox" id="menu-btn" />
                  <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                  
                  <ul className="menu raleway">
                     <li><Link to='/dashboard'>Dashboard</Link></li>
                     <li><Link to='/clients'>Clients</Link></li>
                     <li><Link to='/clients'>Settings</Link></li>
                     <li><Link to='/'>Logout</Link></li>
                  </ul>
         
                  <div className="header-profile-container">
            
                     <div className="profile-dropdown">
                     
                        <input className="menu-btn" type="checkbox" id="profile-btn" />
                        <label className="menu-icon" htmlFor="profile-btn"><span className="header-profile-name raleway">{`${firstName} ${lastName}`}</span><i className="arrow down"></i></label>
                        
                        <ul className="profile-menu raleway">
                           <li><Link to='/#'>Settings</Link></li>
                           <li><Link to='/#'>Logout</Link></li>
                        </ul>
                        
                     </div>


                  </div>
         
               </header>
   

      )

   }

}


function mapStateToProps(state) {
   return {
      user: state.user
   }
}

export default connect(mapStateToProps, {getUser})(Header)