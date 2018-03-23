//MODULES
import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

//CSS, ASSETS
import './Roadmaps.css';

//COMPONENT
class Roadmaps extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         roadmaps: []
         , tasksArray: []
         , roadmap: {
            name: ''
            , first_name: ''
            , last_name: ''
            , total_tasks: ''
            , tasks: []
            , estimated_cost: ''
            , roadmap_id: ''
         }
         , edit: false
      }

      this.handleLoadRoadmapButton = this.handleLoadRoadmapButton.bind(this);
      this.handleTasksArray = this.handleTasksArray.bind(this);
      this.handleEditButton = this.handleEditButton.bind(this);
      this.handleCancelButton = this.handleCancelButton.bind(this);

   }

   componentWillMount() {
      const {agencies_id} = this.props.user;
      axios.get(`/api/roadmaps/?agencyId=${agencies_id}`).then(res => {
			this.setState({roadmaps: res.data})
      })
   }

   handleLoadRoadmapButton(index) {
      const selectedRoadmap = this.state.roadmaps[index];
      const roadmap = Object.assign({}, this.state.roadmap);
      roadmap.name = selectedRoadmap.name;
      roadmap.first_name = selectedRoadmap.first_name;
      roadmap.last_name = selectedRoadmap.last_name;
      roadmap.total_tasks = selectedRoadmap.tasks.length;
      roadmap.roadmap_id = selectedRoadmap.roadmap_id;
      roadmap.tasks = selectedRoadmap.task;
      
      this.setState({roadmap})

      /* CLEAR EXISTING TASK LIST */
      this.setState({tasksArray: []})

      /* GENERATE TASK LIST */
      selectedRoadmap.tasks.map((e, index) => {
         const task_id = e;
         
         axios.get(`/api/task/?taskId=${task_id}`).then(res => {
            const details = res.data[0];
            const tasksArray = this.state.tasksArray;
            tasksArray.push(details);
            this.setState(tasksArray);
            return '';
         })  
            return '';
      })
   }


   handleTasksArray() {
      console.log(this.state.tasksArray);
   }


   handleEditButton() {

		if(this.state.roadmap.name !== ''){
			//CHANGE edit ON STATE TO BE true
			this.setState((prevState) => {
				return {edit: !prevState.edit}
			})

			//CHANGE EDIT TASK FIELDS TO BE EDITABLE
			let inputFields = Array.from(document.getElementsByClassName('edit-roadmap'));
			inputFields.forEach(e => e.removeAttribute("disabled"));
		}
   }


   handleCancelButton() {
		//CHANGE edit ON STATE TO BE false
		this.setState((prevState) => {
			return {edit: !prevState.edit}
		})

		//CLEAR EDIT TASK FIELDS
		const roadmap = Object.assign({}, this.state.roadmap)
		roadmap.name = '';
    roadmap.first_name = '';
    roadmap.last_name = '';
    roadmap.total_tasks= '';
    roadmap.tasks = '';
    roadmap.estimated_cost = '';
    roadmap.roadmap_id = '';
    this.setState({roadmap});
    this.setState({tasksArray: []});

		//CHANGE EDIT TASK FIELDS TO BE UNEDITABLE
		let inputFields = Array.from(document.getElementsByClassName('edit-roadmap'));
		inputFields.forEach(e => e.setAttribute("disabled", "true"));
	}


   render() {
      const {roadmaps, roadmap, tasksArray, edit} = this.state;
      const availableRoadmaps = roadmaps.map((e,index) => 
         <div key={index} className="unique-roadmap">
            <span>Name: <span>{e.name}</span></span>
            <span>Created By: <span>{`${e.first_name} ${e.last_name}`}</span></span>
            <span>Tasks: <span>{e.tasks.length}</span></span>
            <a onClick={this.handleLoadRoadmapButton.bind(this, index)}>Edit</a>
         </div>
      )

      const tasks = tasksArray.map((e, index) => 
         <div key={index}>
            <span>Name: {e.name}</span>
            <span>Estimated Cost: {e.estimated_cost}</span>
            <a>x</a>
         </div>
      )
      
      return(
         <div className="roadmaps-parent-container">

            <div className="roadmaps-child-container-left">
               <h1>Existing Roadmaps</h1>
               <div className="roadmaps-child-container-left-inner">
                  {availableRoadmaps}
               </div>
            </div>

            <div className="roadmaps-child-container-right">

               <div className="roadmaps-child-container-right-1">
                  <h1>View/Edit Roadmap</h1>
                  <div className="roadmaps-child-container-right-1-inner">

                     <span>Name</span>
                     <input className="edit-roadmap" type="text" value={roadmap.name} placeholder="Select A Roadmap" disabled/>

                     <span>Created By</span>
                     <span className="roadmaps-static-span">{`${roadmap.first_name} ${roadmap.last_name}`}</span>

                     <span>Total Tasks</span>
                     <span className="roadmaps-static-span">{roadmap.total_tasks}</span>

                     {edit === false ? 
                      <button
                        className="settings-edit-button"
                        onClick={this.handleEditButton}>
                        Edit
                      </button>
                      :
                      <div className="button-container">
                      <button
                        className="settings-cancel-button"
                        onClick={this.handleCancelButton}>
                        Cancel
                      </button>
                      <button 
                        className="settings-save-button"
                        onClick={this.handleSaveButton}>
                        Save
                      </button>
                      </div>
                    }

                     <span>Current Task List</span>
                     <div className="current-task-list">
                        {tasks}
                     </div>
                     
                  </div>
               </div>

               <div className="roadmaps-child-container-right-2">
                  <h1>Create Roadmap</h1>
                  <div className="roadmaps-child-container-right-2-inner">
                     Test
                  </div>
               </div>


            </div>

            <button onClick={this.handleTasksArray}>Test</button>

         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      user: state.user
   }
}

export default connect(mapStateToProps)(Roadmaps)