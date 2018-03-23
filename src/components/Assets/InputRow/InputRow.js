//MODULES
import React from 'react';

//CSS, ASSETS
import './InputRow.css'

//Component
export default function InputRow(props) {
   return (
      <div className="input-row">
         <label>{props.name}</label>
         <span>
            <input 
               type="text"
               value={props.value}
               onChange={props.onChange}
            />
         </span>
      </div>
   )
}
