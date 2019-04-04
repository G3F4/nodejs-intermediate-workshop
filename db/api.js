const mongoose = require('mongoose');
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: { unique: true, dropDups: true },
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

const eventSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  notification: Boolean,
  time: Date,
});

const Event = mongoose.model('Event', eventSchema);

const subscriptionSchema = new mongoose.Schema({
  userId: String,
  endpoint: {
    type: String,
    index: { unique: true, dropDups: true },
    required: true,
  },
  expirationTime: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports.getMonth = async (userId, date) => {
  console.log(['db.api.getMonth'], userId, date);
  const result = await Event.find({ userId });

  const startDateMoment = moment(date).startOf('month').startOf('week');

  return Array.from({ length: 7 * 6 }).map(() => {
    const date = startDateMoment.add(1, 'day').format('YYYY-MM-DD');

    return {
      date,
      events: (result.filter(doc => date === moment(doc.time).format('YYYY-MM-DD')) || [])
        .map(({ time, description, title, _id }) => ({ time, description, title, id: _id })),
    };
  });
};

module.exports.getDayEvents = async (userId, date) => {
  console.log(['db.api.getDayEvents'], userId, date);
  const result = await Event.find({ userId });

  return (result.filter(doc => moment(date).format('YYYY-MM-DD') === moment(doc.time).format('YYYY-MM-DD')) || [])
    .map(doc => ({
      id: doc._id,
      description: doc.description,
      time: moment(doc.time).format('YYYY-MM-DDThh:mm'),
      title: doc.title,
      notification: doc.notification,
    }));
};

module.exports.addEvent = async (userId, data) => {
  console.log(['db.api.addEvent'], userId, data);
  const doc = new Event({ userId, ...data });

  await doc.save();

  return doc._id;
};

module.exports.updateEvent = async (eventId, data) => {
  console.log(['db.api.updateEvent'], eventId, data);
  await Event.findByIdAndUpdate(eventId, data);

  return eventId;
};

module.exports.deleteEvent = async (eventId) => {
  console.log(['db.api.deleteEvent'], eventId);
  await Event.findByIdAndRemove(eventId);

  return eventId;
};

module.exports.addSubscription = async (userId, data) => {
  console.log(['db.api.addSubscription'], userId, data);
  const doc = new Subscription({ userId, ...data });

  await doc.save();
};

module.exports.getOrCreateUser = (userId, cb) => {
  console.log(['db.api.getOrCreateUser'], userId);
  User.findOneAndUpdate({ userId }, { $set: { userId }}, { upsert: true  }, function (err, user) {

    return cb(err, { userId: user.userId });
  });
};

