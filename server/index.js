//REQUIRED PACKAGES
require('dotenv').config();
const express = require('express')
   , bodyParser = require('body-parser')
   , massive = require('massive')
   , session = require('express-session')
	, passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
	, cookieParser = require('cookie-parser')
	, bcrypt = require('bcryptjs')
	, cors = require('cors');


const app = express();

//VARAIBLES FROM .env
const {SESSION_PORT
      , CONNECTION_STRING
		, SESSION_SECRET
		, DOMAIN
		, CLIENT_ID
		, CLIENT_SECRET
		, CALLBACK_URL} = process.env;

//IMPORTING CONTROLLERS
const controllers = require('./controllers/controllers.js');

//CONNECT DATABASE
massive(CONNECTION_STRING).then(db => {
	app.set('db', db)
})

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use( session({
   secret: SESSION_SECRET
   , resave: false
   , saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());


//PASSPORT LOCAL STRATEGY
passport.use(new LocalStrategy(
	function(username, password, done) {
		app.get('db').retrieve_user([username]).then(result =>{
			const user = result[0];

			//VERIFY USERNAME EXISTS
			if(!user) {console.log('Does Not Exist'); return done(null, false)}
			
			//VERIFY PASSWORD MATCHES
			const validPassword = bcrypt.compareSync(password, user.password);
			if(!validPassword) {console.log('Wrong Password'); return done(null, false)}

			//USER IS VERIFIED AND ThEIR ID IS RETURNED
			return done(null, user.id)

		})
	}
))


passport.serializeUser((id, done) => {
	return done(null, id)
});


passport.deserializeUser((id, done) => {
	app.get('db').retrieve_user_by_id([id]).then(result => {
		const user = result[0];
		return done(null, user);
	})
});




//ENDPOINTS


// app.post('/api/login', passport.authenticate('local', {successRedirect: '/#/dashboard', failureRedirect: '/error'}));

// app.post('/api/login', passport.authenticate('local'), function(req, res) {
// 	console.log('passport user', req.user);
// });



//SERVER LISTENING
app.listen(SESSION_PORT, () => console.log(`Listening on ${SESSION_PORT}`));