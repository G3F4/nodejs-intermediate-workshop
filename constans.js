const PORT = process.env.PORT || 5000;
const SESSION_OPTIONS = {
  secret: 'tajny szyfr enigmy',
  resave: false,
  saveUninitialized: true,
};
const DB_HOST = process.env.DB === 'remote'
  ? 'mongodb://mo1563_calendar:Test!23@85.194.240.29:27017/mo1563_calendar'
  : 'mongodb://localhost/calendar';

module.exports = {
  DB_HOST,
  PORT,
  SESSION_OPTIONS
};
