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
			db.create_new_user([username, hash, agency_employees_id]).then(res.sendStatus(200))

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
			, ]).then(res.sendStatus(200))
	},


	deleteUser: (req, res) => {
		const {agency_employees_id} = req.query;
		const db = req.app.get('db');
		
		db.delete_user([agency_employees_id]).then(result => res.sendStatus(200))
	},


	getTasks: (req, res) => {
		const { agency_id } = req.query;
		const db = req.app.get('db');

		db.retrieve_tasks([agency_id]).then(result =>
			res.status(200).send(result)
		)
	},


	updateTask: (req, res) => {
		const { name
			, description
			, cost
			, tasks_id
			, last_update
			, last_update_by_agency_employees_id } = req.body
		const db = req.app.get('db');

		db.update_task([name, description, cost, last_update, last_update_by_agency_employees_id, tasks_id]).then(result =>
			res.sendStatus(200)
		)
	},

	createTask: (req, res) => {
		const { name
			, description
			, cost
			, date_created
			, agency_employees_id
			, agencies_id
			, last_update
			, last_update_agency_employees_id } = req.body;
		const db = req.app.get('db');

		db.create_new_task([name
			, description
			, cost
			, date_created
			, agency_employees_id
			, agencies_id
			, last_update
			, last_update_agency_employees_id]).then(result => res.sendStatus(200));
	},

	getProducts: (req, res) => {
		const { agencyId } = req.query;
		const db = req.app.get('db');

		db.retrieve_products_by_agency([agencyId]).then(result => res.status(200).send(result))
	},

	updateProduct: (req, res) => {
		const { name, price, products_id } = req.body;
		const db = req.app.get('db');

		db.update_product([name, price, products_id]).then(result => res.sendStatus(200));
	},

	getProductNotes: (req, res) => {
		const {products_id} = req.query;
		const db = req.app.get('db');

		db.retrieve_product_notes([products_id]).then(result => res.status(200).send(result))
	},

	createNote: (req, res) => {
		const {date, agency_employees_id, note, products_id} = req.body.newNote;
		const db = req.app.get('db');

		db.create_note([date, note, products_id, agency_employees_id])
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

	getClients: (req, res) => {
		const {agencyId} = req.query;
		const db = req.app.get('db');

		db.retrieve_clients([agencyId]).then(result => res.status(200).send(result));
	},

	getClientProfile: (req, res) => {
		const {id} = req.query;
		const db = req.app.get('db');

		db.retrieve_client_profile([id]).then(result => 
			res.status(200).send(result))
	},

	updateClient: (req, res) => {
		const {client_name, url, phone, street_address, city, state_province, 
			zip, country, client_id} = req.body.profile;
		const db = req.app.get('db');

		db.update_client([client_name, url, phone, street_address, city, 
			state_province, zip, country, client_id]).then(result =>
			res.sendStatus(200))
	},

	getClientProducts: (req, res) => {
		const {id} = req.query;
		const db = req.app.get('db');

		db.retrieve_client_products([id]).then(result => 
			res.status(200).send(result))
	}

}