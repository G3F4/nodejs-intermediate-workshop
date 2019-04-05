const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  notification: Boolean,
  time: Date,
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
