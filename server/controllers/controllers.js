const bcrypt = require('bcryptjs');

module.exports = {
   
   createUser: (req, res) => {
      const {username, password, firstName, lastName, email, phone, position, agency_id} = req.body;
      const db = req.app.get('db');

      //ENCRYPT PASSWORD
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt); //HASH IS THE HASHED PASSWORD

      db.create_agency_employee([firstName, lastName, email, phone, position, agency_id]).then(result => {
         
         //GET NEW AGENCY EMPLOYEE ID
         const {id: agencyEmployeeId} = result[0];
         
         db.create_new_user([username, hash, agencyEmployeeId]).then(result => console.log(result))


         }
      )
   }, 

   getUsers: (req, res) => {
      const {agencyId} = req.query;
      const db = req.app.get('db');
   
      db.retrieve_agency_users([agencyId]).then(result => {
         res.status(200).send(result);
      })
   },

   updateUser: (req, res) => {
      const {user} = req.body;
      const db = req.app.get('db');

      db.update_agency_employee([
         user.first_name
         , user.last_name
         , user.email
         , user.phone
         , user.position
         , user.agency_employee_id]).then()
   },

   getTasks: (req, res) => {
      const {agencyId} = req.query;
      const db = req.app.get('db');

      db.retrieve_tasks([agencyId]).then(result =>
            res.status(200).send(result)
      )

   },

   updateTask: (req, res) => {
      const {name
         , description
         , estimated_cost
         , task_id
         , last_update
         , last_update_by_agency_employee_id} = req.body
      const db = req.app.get('db');
      
      db.update_task([name, description, estimated_cost, last_update, last_update_by_agency_employee_id, task_id]).then(result =>
         res.status(200).send(result)
      )

   },

   createTask: (req, res) => {
		const {name
		, description
		, estimated_cost
		, date_created
		, agency_employee_id
		, agency_id
		, last_update
		, last_update_by_agency_employee_id} = req.body;

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
      const {agencyId} = req.query;
      const db = req.app.get('db');

      db.retrieve_products_by_user([agencyId]).then(result => res.status(200).send(result))

   },

   updateProduct: (req, res) => {
         const {name, price, product_id} = req.body;
      const db = req.app.get('db');

      db.update_product([name, price, product_id]).then(result => res.status(200).send(result));
   }
   
}