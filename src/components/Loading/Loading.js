//Modules
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {connect} from 'react-redux';

//CSS, Redux Functions
import './Loading.css';
import {getUser} from '../../redux/reducer.js';

//Component
class Loading extends React.Component {

  componentDidMount() {
    this.props.getUser();
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
  return {}
}

export default connect(mapStateToProps, {getUser})(Loading)