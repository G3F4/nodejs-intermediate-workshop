const PORT = process.env.PORT || 5000;
const SESSION_OPTIONS = {
  secret: 'tajny szyfr enigmy',
  resave: false,
  saveUninitialized: true,
};
const DB_HOST = 'mongodb://localhost/calendar';

module.exports = {
  PORT,
  SESSION_OPTIONS,
  DB_HOST,
};
