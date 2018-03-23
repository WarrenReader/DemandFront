//MODULES
import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//CSS, ASSETS
import './Header.css';
import logo from './logo.png';

//COMPONENT
class Header extends React.Component {
   constructor(props) {
		super(props)
		this.state = {
			path: ''
			, view: 'dashboard'
		}
		this.handleDesktopCollapse = this.handleDesktopCollapse.bind(this)
   }


	handleDesktopCollapse() {
		const checkbox = document.getElementById('profile-btn')
		checkbox.checked = false;
	}


	handleMobileCollapse() {
		const checkbox = document.getElementById('menu-btn')
		checkbox.checked = false;
	}


   render() {

		const {first_name: firstName = '', last_name: lastName = ''} = this.props.user;
		const {headerVisibility} = this.props;
		const {view} = this.state;
		
		return (
			
			<div className="header-container">
				{ headerVisibility &&
					<div>
						<header className="header">
							<img src={logo} alt="logo" className="header-logo" />
							<input className="menu-btn" type="checkbox" id="menu-btn" />
							<label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
							<ul className="menu raleway">
								<li onClick={this.handleMobileCollapse}>
									<Link 
										onClick={e => {this.setState({view: 'dashboard'})}} 
										to='/dashboard'>Dashboard
									</Link>
								</li>
								<li onClick={this.handleMobileCollapse}>
									<Link 
									onClick={e => {this.setState({view: 'clients'})}} 
									to='/clients'>Clients
									</Link>
								</li>
								<li onClick={this.handleMobileCollapse}>
									<Link
									onClick={e => {this.setState({view: 'agency'})}} 
									to='/agency'>Agency
									</Link>
								</li>
								<li className="header-link-mobile" onClick={this.handleMobileCollapse}>
									<Link to='/settings'>Account</Link>
								</li>

								<li className="header-link-mobile"
									onClick={this.handleMobileCollapse}><a href={process.env.REACT_APP_LOGOUT}>Logout</a></li>
							</ul>

							<div className="header-profile-container">
								<div className="profile-dropdown">
									<input className="menu-btn" type="checkbox" id="profile-btn" />
									<label className="menu-icon" htmlFor="profile-btn">
										<span className="header-profile-name raleway">{`${firstName} ${lastName}`}</span>
										<i className="arrow down"></i>
									</label>
									<ul className="profile-menu raleway">
										<li onClick={this.handleDesktopCollapse}>
											<Link to='/settings'>Account</Link>
										</li>
										<li onClick={this.handleDesktopCollapse}>
											<a href={process.env.REACT_APP_LOGOUT}>Logout</a>
										</li>
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
								<li><Link to='/clients'>Client List</Link></li>
								<li><Link to='/clients/add-new-client'>Add New Client</Link></li>
							</ul>}

							{view === 'agency'
							&& 
							<ul>
								<li>AGENCY</li>
								<li><Link to='/'>Metrics</Link></li>
								<li><Link to='/agency/products'>Products</Link></li>
								<li><Link to='/agency/tasks'>Tasks</Link></li>
								<li><Link to='/agency/roadmaps'>Roadmaps</Link></li>
								<li><Link to='/agency/users'>Users</Link></li>
							</ul>}
						</div>
					</div>
					}
				</div>
      )
   }
}

function mapStateToProps(state) {
   return {
      user: state.user
      , headerVisibility: state.headerVisibility
   }
}

export default connect(mapStateToProps)(Header)