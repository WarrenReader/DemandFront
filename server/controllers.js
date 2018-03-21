//MODULES
const bcrypt = require('bcryptjs');

//ENDPOINT FUNCTIONS
module.exports = {

	createUser: (req, res) => {
		const {first_name, last_name, email, phone, position, agencies_id, username, password} = req.body;
		const db = req.app.get('db');

		//ENCRYPT PASSWORD
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt); //HASH IS THE HASHED PASSWORD

		//CREATE NEW AGENCY EMPLOYEE
		db.create_agency_employee([first_name, last_name, email, phone, position, agencies_id]).then(result => {

			// GET NEW AGENCY EMPLOYEE ID
			const { id: agency_employees_id } = result[0];

			//CREATE NEW USER
			db.create_new_user([username, hash, agency_employees_id])

		})
	},

	getUsers: (req, res) => {
		const { agencyId } = req.query;
		const db = req.app.get('db');

		db.retrieve_agency_users([agencyId]).then(result => {
			res.status(200).send(result);
		})
	},

	updateUser: (req, res) => {
		const {user} = req.body;
		const db = req.app.get('db');
		
		db.update_user([
			user.agency_employees_id
			, user.username
			, user.first_name
			, user.last_name
			, user.email
			, user.phone
			, user.position
			, ])
	},


	deleteUser: (req, res) => {

		const {agency_employees_id} = req.body;
		const db = req.app.get('db');
		
		db.delete_user([agency_employees_id])
	},


	getTasks: (req, res) => {
		const { agencyId } = req.query;
		const db = req.app.get('db');

		db.retrieve_tasks([agencyId]).then(result =>
			res.status(200).send(result)
		)

	},

	updateTask: (req, res) => {
		const { name
			, description
			, estimated_cost
			, task_id
			, last_update
			, last_update_by_agency_employee_id } = req.body
		const db = req.app.get('db');

		db.update_task([name, description, estimated_cost, last_update, last_update_by_agency_employee_id, task_id]).then(result =>
			res.status(200).send(result)
		)

	},

	createTask: (req, res) => {
		const { name
			, description
			, estimated_cost
			, date_created
			, agency_employee_id
			, agency_id
			, last_update
			, last_update_by_agency_employee_id } = req.body;

		const db = req.app.get('db');

		db.create_new_task([name
			, description
			, estimated_cost
			, date_created
			, agency_employee_id
			, agency_id
			, last_update
			, last_update_by_agency_employee_id]).then(result => res.status(200).send(result));

	},

	getProducts: (req, res) => {
		const { agencyId } = req.query;
		const db = req.app.get('db');

		db.retrieve_products_by_user([agencyId]).then(result => res.status(200).send(result))

	},

	updateProduct: (req, res) => {
		const { name, price, product_id } = req.body;
		const db = req.app.get('db');

		db.update_product([name, price, product_id]).then(result => res.status(200).send(result));
	},

	getRoadmaps: (req, res) => {
		const { agencyId } = req.query;
		const db = req.app.get('db');

		db.retrieve_roadmaps([agencyId]).then(result => res.status(200).send(result))

	},

	getTask: (req, res) => {
		const { taskId } = req.query;
		const db = req.app.get('db');

		db.retrieve_task([taskId]).then(result =>
			res.status(200).send(result)
		)
	},

	getClientProducts: (req, res) => {
		const { agencyId } = req.query;
		const db = req.app.get('db');

		db.retrieve_client_products([agencyId]).then(result => res.status(200).send(result))
	}

}