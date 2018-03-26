//MODULES
require('dotenv').config();
const express = require('express')
   , bodyParser = require('body-parser')
   , massive = require('massive')
   , session = require('express-session')
	, passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
	, bcrypt = require('bcryptjs')
	, cors = require('cors');

//IMPORT CONTROLLERS
const controllers = require('./controllers.js');

//SETUP APP
const app = express();
app.use(express.static(`${__dirname}/../build`))

//IMPORT VARAIBLES FROM .env
const {SESSION_PORT
      , CONNECTION_STRING
		, SESSION_SECRET
		, REACT_APP_LOGIN_PAGE} = process.env;

//CONNECT DATABASE
massive(CONNECTION_STRING).then(db => {
	app.set('db', db)
})

//MIDDLEWARE
app.use(bodyParser.json());
app.use( session({		//SESSION DETAILS ADDED TO REQ.SESSION
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
//LOGIN & LOGOUT
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
	res.redirect(REACT_APP_LOGIN_PAGE);
})

//CONFIRM USER SESSION
app.get('/auth/me', (req, res) => {
   if (req.user) {
      res.status(200).send(req.user);
   } else {
      res.status(401).send('Not Logged In');
   }
})

//APPLICATION ENDPOINTS
app.post('/api/create-user', controllers.createUser)
app.get('/api/get-users', controllers.getUsers)
app.delete('/api/delete-user', controllers.deleteUser)
app.put('/api/update-user', controllers.updateUser)
app.get('/api/tasks', controllers.getTasks)
app.put('/api/update-task', controllers.updateTask)
app.post('/api/create-task', controllers.createTask)
app.get('/api/products', controllers.getProducts)
app.put('/api/update-product', controllers.updateProduct)
app.get('/api/get-product-notes', controllers.getProductNotes)
app.post('/api/create-note', controllers.createNote)
app.get('/api/roadmaps', controllers.getRoadmaps)
app.get('/api/task', controllers.getTask)
app.get('/api/clients', controllers.getClients)
app.get('/api/client-profile', controllers.getClientProfile)
app.put('/api/update-client', controllers.updateClient)
app.get('/api/client-products', controllers.getClientProducts)

//SERVER LISTENING
app.listen(SESSION_PORT, () => console.log(`Listening on ${SESSION_PORT}`));