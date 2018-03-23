//MODULES
import React from 'react';

//CSS, ASSETS
import './SaveButton.css';

//COMPONENT

export default function saveButton(props) {
   return (
      <button
			className="save-button"
         onClick={props.onClick}>
         {props.name}
      </button>
   )
}