//COMPONENTS
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Moment from 'react-moment';

//CSS, ASSETS
import './Tasks.css';

//COMPONENT
class Tasks extends React.Component {
   constructor() {
      super()
      this.state = {
         tasks: []
         , editTask: {
            name: ''
            , description: ''
            , estimated_cost: ''
            , task_id: ''
            , last_update: ''
            , last_update_by_agency_employee_id: ''
			}
			, createTask: {
				name: ''
				, description: ''
				, estimated_cost: ''
				, date_created: ''
				, agency_employee_id: ''
				, agency_id: ''
				, last_update: ''
				, last_update_by_agency_employee_id: ''
			}
         , edit: false
      }

      this.handleLoadEditTask = this.handleLoadEditTask.bind(this);
      this.handleEditButton = this.handleEditButton.bind(this);
		this.handleSaveButton = this.handleSaveButton.bind(this);
		this.handleCreateTask = this.handleCreateTask.bind(this);
   }


   componentWillMount() {
		//RETREIVE TASKS FROM DATABASE
      const {agency_id} = this.props.user;
      axios.get(`/api/tasks?agencyId=${agency_id}`).then(result => {
         this.setState({tasks: result.data})
		})
		
		//SET DATE VALUE ON this.state.createTask.date_created
		const createTask = Object.assign({}, this.state.createTask);
		createTask.date_created = new Date();
		createTask.last_update = new Date();
		createTask.agency_employee_id = this.props.user.agency_employee_id;
		createTask.last_update_by_agency_employee_id = this.props.user.agency_employee_id;
		createTask.agency_id = this.props.user.agency_id;
		this.setState({createTask})
   }


   handleLoadEditTask(index) {
      //ADD INDEX VALUE TO editTask ON STATE
      let editTask = Object.assign({}, this.state.editTask);

      //ADD TASK TO editTask ON STATE
      let loadTask = this.state.tasks[index]
      editTask.name = loadTask.name;
      editTask.description = loadTask.description;
      editTask.estimated_cost = loadTask.estimated_cost;
      editTask.task_id = loadTask.task_id;

      //ADD last_update TO editTask ON STATE
      const now = new Date();
      editTask.last_update = now;

      //ADD agency_employee_id TO editTask ON STATE
      editTask.last_update_by_agency_employee_id = this.props.user.agency_employee_id;

      //UPDATE STATE
      this.setState({editTask})

   }


   handleEditButton() {
      //CHANGE edit ON STATE TO BE true
      this.setState((prevState) => {
         return {edit: !prevState.edit}
      })

      //CHANGE EDIT TASK FIELDS TO BE EDITABLE
      let inputFields = Array.from(document.getElementsByClassName('edit-task'));
      inputFields.forEach(e => e.removeAttribute("disabled"));
   }


   handleSaveButton() {
      //CHANGE edit ON STATE TO BE false
      this.setState((prevState) => {
         return {edit: !prevState.edit}
      })

      //CHANGE EDIT TASK FIELDS TO BE UNEDITABLE
      let inputFields = Array.from(document.getElementsByClassName('edit-task'));
      inputFields.forEach(e => e.setAttribute("disabled", "true"));

      axios.put('/api/update-task', this.state.editTask).then(result => console.log(result))
   }

	
	handleCreateTask() {
		let {createTask} = this.state;
		axios.post('/api/create-task', createTask).then(res => console.log(res))
	}


   render() {

      let {tasks, edit, editTask, createTask} = this.state;
      let existingTasks =  tasks.map((e, i) => 
         <div key={i} className="tasks-existing-task">
            <span>Name: {`${e.name}`}</span>
            <span>Last Update: {<Moment format="YYYY-MM-DD">{e.last_update}</Moment>}</span>
            <span>Last Update By: {`${e.first_name} ${e.last_name}`}</span>
            <a onClick={this.handleLoadEditTask.bind(this, i)}>Edit</a>
         </div>
      )

      return(
         <div className="tasks-parent-container">
            
				<div className="tasks-child-left">
					<h1>Existing Tasks</h1>
					<div className="tasks-child-left-inner">
						{existingTasks}
					</div>
				</div>

				<div className="tasks-child-right1">
					<h1>Edit Task</h1>
					<div className="tasks-child-right-inner">

						<span>Task Name</span>
						<input 
							type="text"
							className="edit-task"
							placeholder="You Must Select A Task To Edit It"
							value={editTask.name}
							onChange={e => {
								let editTask = Object.assign({}, this.state.editTask)
								editTask.name = e.target.value;
								this.setState({editTask});
								}}
							disabled />

						<span>Description</span>
						<textarea 
							rows='4'
							className="edit-task"
							value={editTask.description}
							onChange={e => {
								let editTask = Object.assign({}, this.state.editTask)
								editTask.description = e.target.value;
								this.setState({editTask});
								}}
							disabled />

						<span>Estimated Cost</span>
						<input 
							type="text"
							className="edit-task"
							value={editTask.estimated_cost}
							onChange={e => {
								let editTask = Object.assign({}, this.state.editTask)
								editTask.estimated_cost = e.target.value;
								this.setState({editTask});
								}}
							disabled />

						{edit === false ? 
							<button
								className="settings-edit-button"
								onClick={this.handleEditButton}>
								Edit
							</button>
							:
							<button 
								className="settings-save-button"
								onClick={this.handleSaveButton}>
								Save
							</button>
						}


	

                   </div>
				</div>
					
				<div className="tasks-child-right2">
					<h1>Create Task</h1>
					<div className="tasks-child-right-inner">
						
					<span>Task Name</span>
					<input 
						type="text"
						className="edit-task"
						value={createTask.name}
						onChange={e => {
							let createTask = Object.assign({}, this.state.createTask)
							createTask.name = e.target.value;
							this.setState({createTask})
						}} />

					<span>Description</span>
					<textarea 
						rows='4'
						className="edit-task"
						value={createTask.description}
						onChange={e => {
							let createTask = Object.assign({}, this.state.createTask)
							createTask.description = e.target.value;
							this.setState({createTask})
						}} />

					<span>Estimated Cost</span>
					<input 
						type="text"
						className="edit-task"
						value={createTask.estimated_cost}
						onChange={e => {
							let createTask = Object.assign({}, this.state.createTask)
							createTask.estimated_cost = e.target.value;
							this.setState({createTask})
						}} />

						<button 
							className="settings-create-button"
							onClick={this.handleCreateTask}>
							Create Task
						</button>

					</div>
				</div>


			</div>
			
      )
   }
}

function mapStateToProps(state) {
   return {user: state.user}
}

export default connect(mapStateToProps)(Tasks)