const cors = require('cors');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const router = require('./router');
const { PORT, SESSION_OPTIONS } = require('./constans');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

// express Session
app.use(session(SESSION_OPTIONS));

// passport init
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/github');
  }
});

app.use(express.static('public'));
app.use(router);

app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.info( `express app running on port: ${app.get('port')}`);
});
