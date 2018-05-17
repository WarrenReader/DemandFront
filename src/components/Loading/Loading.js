//Modules
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';

//CSS, Redux Functions
import './Loading.css';
import {getUser, getClients, getUsers, getProducts} from '../../redux/reducer.js';

//Component
class Loading extends React.Component {

  componentDidMount() {
    this.props.getUser().then(() => {
      this.props.getClients(this.props.user.agency_id);
      this.props.getUsers(this.props.user.agency_id);
      this.props.getProducts(this.props.user.agency_id);
    });

    setTimeout(() => this.props.history.push('/dashboard'), 2000)
  }

  render() {

    return (
      <div className="loading-container">
        <CircularProgress size={175} color={'rgb(220, 220, 220)'} thickness={5}/>
        <span className="loading-text">Loading...</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {getUser, getClients, getUsers, getProducts})(Loading)