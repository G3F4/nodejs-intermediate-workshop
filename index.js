const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./db/api.js');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');

const DB_HOST = process.env.DB === 'remote'
  ? 'mongodb://mo1563_calendar:Test!23@85.194.240.29:27017/mo1563_calendar'
  : 'mongodb://localhost/calendar';
const PORT = process.env.PORT || 5000;
const SESSION_OPTIONS = {
  secret: 'tajny szyfr enigmy',
  resave: false,
  saveUninitialized: true,
};

const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to db | Host: ${DB_HOST}`);
});

mongoose.connect(DB_HOST, { useNewUrlParser: true });
mongoose.set('debug', true);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.DB === 'remote' ? 'c2c0e9aa52e3be3c9314' : '7fb8d0a83343f23179f1',
    clientSecret: process.env.DB === 'remote' ? '9bede45ff253717428e0a02fc6c3f6d11d8a1da0' : 'f0cba3f5c1832e8acb09a55117c18ebdd4d99bd4',
    callbackURL: process.env.DB === 'remote' ? 'https://warsawjs-workshop-31.herokuapp.com/auth/github/callback' : 'http://localhost:5000/auth/github/callback'
  },
  (accessToken, refreshToken, profile, cb) => api.getOrCreateUser(profile.id, cb),
));

app.use(bodyParser.json());
app.use(morgan('combined'));

// express Session
app.use(session(SESSION_OPTIONS));

// passport init
app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/github');
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/' }),
);

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/github');
  }
});

app.get('/calendar', async function (req, res) {
  const data = await api.getMonth(req.user.userId, req.query.month);

  res.json({ data });
});

app.get('/day', async function (req, res) {
  const data = await api.getDayEvents(req.user.userId, req.query.date);

  res.json({ data });
});

app.post('/event', async function (req, res) {
  await api.addEvent(req.user.userId, req.body);

  res.status(201);
  res.send();
});

app.put('/event', async function (req, res) {
  await api.updateEvent(req.query.id, req.body);

  res.status(200);
  res.send();
});

app.delete('/event', async function (req, res) {
  await api.deleteEvent(req.query.id);

  res.status(204);
  res.send();
});

app.post('/notifications', async function (req, res) {
  await api.addSubscription(req.user.userId, req.body.data);

  res.status(201);
  res.send();
});

app.use(express.static('public'));
app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.info( `express app running on port: ${app.get('port')}`);
});
