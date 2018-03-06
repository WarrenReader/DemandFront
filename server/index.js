//REQUIRED PACKAGES
require('dotenv').config();
const express = require('express')
   , bodyParser = require('body-parser')
   , massive = require('massive')
   , session = require('express-session')
   , bcrypt = require('bcryptjs');

//IMPORT CONTROLLERS
const controllers = require('./controllers/controllers.js');


//VARAIBLES FROM .env
const {SESSION_PORT
      , CONNECTION_STRING
      , SESSION_SECRET} = process.env;


//CONNECT DATABASE
massive(CONNECTION_STRING).then(db => {
   app.set('db', db)
})

const app = express();
app.use(bodyParser.json());
app.use( session({
   secret: SESSION_SECRET
   , resave: false
   , saveUninitialized: false
   , cookie: {maxAge: 1800000}
}))

//ENDPOINTS
app.post('/api/login', controllers.login);
app.post('/api/create-user', controllers.createUser);



//SERVER LISTENING
app.listen(SESSION_PORT, () => console.log(`Listening on ${SESSION_PORT}`));