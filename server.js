const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const router = require('./router');
const { PORT, SESSION_OPTIONS } = require('./constans');

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

// express Session
app.use(session(SESSION_OPTIONS));

// passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.use(express.static('public'));
app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.info( `express app running on port: ${app.get('port')}`);
});
