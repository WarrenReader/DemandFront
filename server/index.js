//REQUIRED PACKAGES
require('dotenv').config();
const express = require('express')
   , bodyParser = require('body-parser')
   , massive = require('massive')
   , session = require('express-session')
	, passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
	, bcrypt = require('bcryptjs')
	, cors = require('cors');


//IMPORTING CONTROLLERS
const controllers = require('./controllers/controllers.js');


//SETUP APP
const app = express();


//IMPORTING VARAIBLES FROM .env
const {SESSION_PORT
      , CONNECTION_STRING
		, SESSION_SECRET} = process.env;


//CONNECT DATABASE
massive(CONNECTION_STRING).then(db => {
	app.set('db', db)
})


//MIDDLEWARE
app.use(bodyParser.json());
app.use( session({		//ADDED TO REQ.SESSION
   secret: SESSION_SECRET
   , resave: false
	, saveUninitialized: false
	, cookie: {maxAge: 1000000}
}))

app.use(passport.initialize());
app.use(passport.session());


//PASSPORT LOCAL STRATEGY
passport.use(new LocalStrategy(
	function(username, password, done) {
		app.get('db').retrieve_user([username]).then(result =>{
			const user = result[0];

			//VERIFY USERNAME EXISTS
			if(!user) {return done(null, 'Unauthorized')}
			
			//VERIFY PASSWORD MATCHES
			const validPassword = bcrypt.compareSync(password, user.password);
			if(!validPassword) {return done(null, 'Unauthorized')}

			//USER IS VERIFIED AND THEIR ID IS RETURNED
			return done(null, user.id)

		})
	}
))

passport.serializeUser((id, done) => {
	return done(null, id)
});

passport.deserializeUser((id, done) => {
	if(id === "Unauthorized") {
		return done(null, 'Unauthorized');
	}

	app.get('db').retrieve_user_by_id([id]).then(result => {
		const user = result[0];
		return done(null, user);
	})
});




//ENDPOINTS
app.post('/api/login', passport.authenticate('local'), (req, res, next) => {
	if(req.user === 'Unauthorized') {
		res.status(200).send(req.user)
	} else {
		res.redirect(200, '/dashboard')
	}

	next();

});

app.get('/logout', (req,res) => {
	req.logout();
	res.redirect(200, '/');
})


app.get('/auth/me', (req, res) => {
   if (req.user) {
      res.status(200).send(req.user);
   } else {
      res.status(401).send('Not Logged In');
   }
})

app.post('/api/create-user', controllers.createUser)


//SERVER LISTENING
app.listen(SESSION_PORT, () => console.log(`Listening on ${SESSION_PORT}`));