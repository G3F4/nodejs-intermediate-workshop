const PORT = process.env.PORT || 5000;
const SESSION_OPTIONS = {
  secret: 'tajny szyfr enigmy',
  resave: false,
  saveUninitialized: true,
};

module.exports = {
  PORT,
  SESSION_OPTIONS,
};
