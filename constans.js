const PORT = process.env.PORT || 5000;
const SESSION_OPTIONS = {
  secret: 'tajny szyfr enigmy',
  resave: false,
  saveUninitialized: true,
};
const DB_HOST = process.env.DB_HOST;

module.exports = {
  PORT,
  SESSION_OPTIONS,
  DB_HOST,
};
