const bcrypt = require('bcryptjs');

module.exports = {
   
   createUser: (req, res) => {
      const {username, password} = req.body;
      const db = req.app.get('db')

      //ENCRYPT PASSWORD
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt); //HASH IS THE HASHED PASSWORD

      db.create_new_user([username, hash]).then(result =>
         res.status(200).send(result)
      ).catch(() => res.status(200).send({status: 'Duplicate'}));
   },


   login: (req, res) => {
      const {username, password} = req.body;
      console.log(username, password);

      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt); 

   }
}