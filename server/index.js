//REQUIRED PACKAGES
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//VARAIBLES FROM .env
const {SESSION_PORT} = process.env;


const app = express();

app.use(bodyParser.json());



//SERVER LISTENING
app.listen(SESSION_PORT, () => console.log(`Listening on ${SESSION_PORT}`));