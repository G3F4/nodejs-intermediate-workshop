const mongoose = require('mongoose');

const DB_HOST = process.env.DB === 'remote'
  ? 'mongodb://mo1563_calendar:Test!23@85.194.240.29:27017/mo1563_calendar'
  : 'mongodb://localhost/calendar';
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to db | Host: ${DB_HOST}`);
});

mongoose.connect(DB_HOST, { useNewUrlParser: true });
mongoose.set('debug', true);
