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
   }
   
}