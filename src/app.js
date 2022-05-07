const express = require ('express');
const morgan = require ('morgan');
const compression = require ('compression');
const helmet = require ('helmet');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const cookieSession = require ('cookie-session');
require('dotenv').config()
const api = require ('./api');
const passport = require("passport");


// const errorMiddlewares = require ('./middlewares/errorMiddleware');

//add body parser

// const api = require ('./api');

// const project  = require('./constants/project')

const app = express ();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use (morgan ('tiny'));

app.use (compression ());

app.use (helmet ());

// app.use (cors ({origin: process.env.FRONTEND_URL, credentials: true}));

app.use (express.json ());

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_KEY],
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.get ('/', (req, res) => {
  res.send (`API is running.`);
});

//add error handling

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use ('/api/v2', api);

// app.use (errorMiddlewares.notFound);
// app.use (errorMiddlewares.errorHandler);

module.exports = app;

//todo: create users model and schema
//todo: set up google SSO strategy with Passport

//test
