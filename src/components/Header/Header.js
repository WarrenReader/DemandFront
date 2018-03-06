import React from 'react';
import './Header.css';
import logo from './logo.png';

const Header = (props) => {
   return (
   <header className="header-parent-container">

      <img src={logo} alt="logo" className="header-logo"/>

      <nav className="main-nav raleway">
         <ul>
            <li>Dashboard</li>
            <li>Link2</li>
            <li>Link3</li>
            <li>Link4</li>
            <li>Logout</li>
         </ul>
      </nav>
   </header>
   )
}

export default Header;