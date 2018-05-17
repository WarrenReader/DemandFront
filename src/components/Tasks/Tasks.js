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
            , cost: ''
            , tasks_id: ''
            , last_update: ''
            , last_update_by_agency_employees_id: ''
			}
			, createTask: {
				name: ''
				, description: ''
				, cost: ''
				, date_created: ''
				, agency_employees_id: ''
				, agencies_id: ''
				, last_update: ''
				, last_update_agency_employees_id: ''
			}
			, edit: false
			, editTaskStatus: ''
			, createTaskStatus: ''
      }

      this.handleLoadEditTask = this.handleLoadEditTask.bind(this);
      this.handleEditButton = this.handleEditButton.bind(this);
		this.handleSaveButton = this.handleSaveButton.bind(this);
		this.handleCancelButton = this.handleCancelButton.bind(this);
		this.handleCreateTask = this.handleCreateTask.bind(this);
   }


   componentWillMount() {
		//RETREIVE TASKS FROM DATABASE
		// const {agencies_id} = this.props.user;

    //   axios.get(`/api/tasks?agency_id=${agencies_id}`).then(result => {
    //      this.setState({tasks: result.data})
		// })
		
		//SET DATE VALUE ON this.state.createTask.date_created
		// const createTask = Object.assign({}, this.state.createTask);
		// createTask.date_created = new Date();
		// createTask.last_update = new Date();
		// createTask.agency_employees_id = this.props.user.agency_employees_id;
		// createTask.last_update_agency_employees_id = this.props.user.agency_employees_id;
		// createTask.agencies_id = this.props.user.agencies_id;
		// this.setState({createTask})
   }


   handleLoadEditTask(index) {
      //ADD INDEX VALUE TO editTask ON STATE
      let editTask = Object.assign({}, this.state.editTask);

      //ADD TASK TO editTask ON STATE
      let loadTask = this.state.tasks[index]
      editTask.name = loadTask.name;
      editTask.description = loadTask.description;
      editTask.cost = loadTask.cost;
      editTask.tasks_id = loadTask.tasks_id;

      //ADD last_update TO editTask ON STATE
      const now = new Date();
      editTask.last_update = now;

      //ADD agency_employee_id TO editTask ON STATE
      editTask.last_update_by_agency_employees_id = this.props.user.agency_employees_id;

      //UPDATE STATE
      this.setState({editTask})
   }


   handleEditButton() {

		if(this.state.editTask.name !== ''){
			//CHANGE edit ON STATE TO BE true
			this.setState((prevState) => {
				return {edit: !prevState.edit}
			})

			this.setState({editTaskStatus: ''})

			//CHANGE EDIT TASK FIELDS TO BE EDITABLE
			let inputFields = Array.from(document.getElementsByClassName('edit-task'));
			inputFields.forEach(e => e.removeAttribute("disabled"));
		}
   }


   handleSaveButton() {
      //CHANGE edit ON STATE TO BE false
      this.setState((prevState) => {
         return {edit: !prevState.edit}
      })

      //CHANGE EDIT TASK FIELDS TO BE UNEDITABLE
      let inputFields = Array.from(document.getElementsByClassName('edit-task'));
      inputFields.forEach(e => e.setAttribute("disabled", "true"));

      axios.put('/api/update-task', this.state.editTask).then(result => {
			this.setState({editTaskStatus: result.status})
		})
   }

	
	handleCancelButton() {
		//CHANGE edit ON STATE TO BE false
		this.setState((prevState) => {
			return {edit: !prevState.edit}
		})

		//CLEAR EDIT TASK FIELDS
		const editTask = Object.assign({}, this.state.editTask)
		editTask.name = '';
		editTask.description = '';
		editTask.cost = '';
		this.setState({editTask});

		//CHANGE EDIT TASK FIELDS TO BE UNEDITABLE
		let inputFields = Array.from(document.getElementsByClassName('edit-task'));
		inputFields.forEach(e => e.setAttribute("disabled", "true"));
	}


	handleCreateTask() {
		let {createTask} = this.state;
		axios.post('/api/create-task', createTask).then(result => {
			this.setState({createTaskStatus: result.status})
		})
	}


   render() {

      let {edit, editTask, createTask, editTaskStatus, createTaskStatus} = this.state;
      let {tasks} = this.props;
      let existingTasks =  tasks.map((e, i) => 
         <div key={i} className="tasks-existing-task">
            <span>Name: <span>{`${e.name}`}</span></span>
            <span>Last Update: <span>{<Moment format="YYYY-MM-DD">{e.last_update}</Moment>}</span></span>
            <span>Last Update By: <span>{`${e.first_name} ${e.last_name}`}</span></span>
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

				<div className="tasks-child-right">
					<div className="tasks-child-right1">
						<h1>Edit Task</h1>
						{editTaskStatus === 200 ? <div className="edit-task-status">Update Successful</div> : ''}
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
								value={editTask.cost}
								onChange={e => {
									let editTask = Object.assign({}, this.state.editTask)
									editTask.cost = e.target.value;
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
								<div>
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

							</div>
					</div>
						
					<div className="tasks-child-right2">
						<h1>Create Task</h1>
						{createTaskStatus === 200 ? <div className="create-task-status">Task Created</div> : ''}
						<div className="tasks-child-right-inner">
							
						<span>Task Name</span>
						<input 
							type="text"
							value={createTask.name}
							onChange={e => {
								let createTask = Object.assign({}, this.state.createTask)
								createTask.name = e.target.value;
								this.setState({createTask})
							}} />

						<span>Description</span>
						<textarea 
							rows='4'
							value={createTask.description}
							onChange={e => {
								let createTask = Object.assign({}, this.state.createTask)
								createTask.description = e.target.value;
								this.setState({createTask})
							}} />

						<span>Cost</span>
						<input 
							type="text"
							value={createTask.cost}
							onChange={e => {
								let createTask = Object.assign({}, this.state.createTask)
								createTask.cost = e.target.value;
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

			</div>
			
      )
   }
}

function mapStateToProps(state) {
   return {
     tasks: state.tasks
    }
}

export default connect(mapStateToProps)(Tasks)