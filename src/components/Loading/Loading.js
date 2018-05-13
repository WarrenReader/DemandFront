//Modules
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

//CSS
import './Loading.css';

//Component
export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <CircularProgress size={175} color={'rgb(220, 220, 220)'} thickness={5}/>
        <span className="loading-text">Loading...</span>
      </div>
    )
  }
}