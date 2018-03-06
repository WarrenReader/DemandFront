//REQUIRED PACKAGES
require('dotenv').config();
const express = require('express')
   , bodyParser = require('body-parser')
   , massive = require('massive')
   , session = require('express-session')
   , bcrypt = require('bcryptjs')
   , passport = require('passport')
   , localStrategy = require('passport-local').Strategy

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

//PASSPORT LOCAL STRATEGY

passport.use(new LocalStrategy(
  function(username, password, done) {
      User.getUserByUsername(username, function(err, user){
         if(err) throw err;
         if(!user){
            return done(null, false, {message: 'Unknown User'});
         }
         
         User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
               return done(null, user);
            } else {
               return done(null, false, {message: 'Invalid password'})
            }
         })
      })
   
  }));



//ENDPOINTS
app.post('/api/login', passport.authenticate('local', {successRedirect: '/success', failureRedirect: '/fail'}), (req, res) => {
   res.redirect('/success');
});

app.post('/api/create-user', controllers.createUser);



//SERVER LISTENING
app.listen(SESSION_PORT, () => console.log(`Listening on ${SESSION_PORT}`));