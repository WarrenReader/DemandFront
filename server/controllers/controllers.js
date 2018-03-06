module.exports = {
   
   createUser: (req, res) => {
      let {username, password} = req.body;
      const db = req.app.get('db')

      db.create_new_user([username, password]).then(result => {
         res.status(200).send(result);
      });

   }
}