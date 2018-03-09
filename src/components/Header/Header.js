//MODULES
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//CSS AND ASSETS
import './Header.css';
import logo from './logo.png';
import {getUser} from '../../redux/reducer.js';

//COMPONENT
class Header extends React.Component {
   constructor(props) {
      super(props)

      this.handleLogout = this.handleLogout.bind(this);
   }


   componentDidMount() {
      this.props.getUser();
   }


   handleLogout() {
      axios.get('/logout').then(res => {
         this.props.history.push(res.headers.location) //REDIRECT IF LOGGED IN  
      })
   }


   render() {

      const {first_name: firstName = '', last_name: lastName = ''} = this.props.user;
      const {view} = this.props;

      return (

         <div>
               <header className="header">
                  <img src={logo} alt="logo" className="header-logo" />
                  <input className="menu-btn" type="checkbox" id="menu-btn" />
                  <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                  <ul className="menu raleway">
                     <li><Link to='/dashboard'>Dashboard</Link></li>
                     <li><Link to='/clients'>Clients</Link></li>
                     <li><Link to='/agency'>Agency</Link></li>
                     <li className="header-link-mobile"><Link to='/settings'>Settings</Link></li>
                     <li className="header-link-mobile"><a onClick={this.handleLogout}>Logout</a></li>
                  </ul>

                  <div className="header-profile-container">
                     <div className="profile-dropdown">
                        <input className="menu-btn" type="checkbox" id="profile-btn" />
                        <label className="menu-icon" htmlFor="profile-btn">
                           <span className="header-profile-name raleway">{`${firstName} ${lastName}`}</span>
                           <i className="arrow down"></i>
                        </label>
                        <ul className="profile-menu raleway">
                           <li><Link to='/#'>Settings</Link></li>
                           <li><a onClick={this.handleLogout}>Logout</a></li>
                        </ul>
                     </div>
                  </div>

               </header>

                  <div className="secondary-menu">

                     {view === 'dashboard'
                     && 
                     <ul>
                        <li>DASHBOARD</li>
                        <li><Link to='/'>Link1</Link></li>
                        <li><Link to='/'>Link2</Link></li>
                        <li><Link to='/'>Link3</Link></li>
                        <li><Link to='/'>Link4</Link></li>
                        <li><Link to='/'>Link5</Link></li>
                     </ul>}

                     {view === 'clients'
                     && 
                     <ul>
                        <li>CLIENTS</li>
                        <li><Link to='/'>Link1</Link></li>
                        <li><Link to='/'>Link2</Link></li>
                        <li><Link to='/'>Link3</Link></li>
                     </ul>}

                     {view === 'agency'
                     && 
                     <ul>
                        <li>AGENCY</li>
                        <li><Link to='/'>Link1</Link></li>
                        <li><Link to='/'>Link2</Link></li>
                        <li><Link to='/'>Link3</Link></li>
                     </ul>}
                     
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


export default connect(mapStateToProps, {getUser})(Header)