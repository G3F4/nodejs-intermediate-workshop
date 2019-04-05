const mongoose = require('mongoose');
const { DB_HOST } = require('../constans');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info(`Connected to db | Host: ${DB_HOST}`);
});

mongoose.connect(DB_HOST, { useNewUrlParser: true });
mongoose.set('debug', true);
