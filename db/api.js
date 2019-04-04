const moment = require('moment-timezone');
const EventModel = require('./models/EventModel');
const SubscriptionModel = require('./models/SubscriptionModel');
const UserModel = require('./models/UserModel');

module.exports.getMonth = async (userId, date) => {
  console.info(['db.api.getMonth'], userId, date);
  const result = await EventModel.find({ userId });

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
  console.info(['db.api.getDayEvents'], userId, date);
  const result = await EventModel.find({ userId });

  return (result.filter(doc => moment(date).format('YYYY-MM-DD') === moment(doc.time).format('YYYY-MM-DD')) || [])
    .map(doc => ({
      id: doc._id,
      description: doc.description,
      time: moment(doc.time).format('YYYY-MM-DDThh:mm'),
      title: doc.title,
      notification: doc.notification,
    }));
};

module.exports.getEventsWithinNextMinuteWithActiveNotification = async () => {
  const $gte = moment(Date.now()).startOf('day').toDate();
  const $lte = moment(Date.now()).add(1, 'day').toDate();

  try {
    const events = await EventModel.find({
      time: { $gte, $lte },
      notification: true,
    });

    return events.map(doc => doc.toJSON());
  } catch (e) {
    throw new Error(`api:error getEventsWithinNextMinuteWithActiveNotification | ${e}`);
  }
};

module.exports.getDayEvents = async (userId, date) => {
  console.info(['db.api.getDayEvents'], userId, date);
  const result = await EventModel.find({ userId });

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
  console.info(['db.api.addEvent'], userId, data);
  const doc = new EventModel({
    userId,
    title: data.title,
    description: data.description,
    notification: data.notification,
    time: moment(data.time).toDate(),
  });

  await doc.save();

  return doc._id;
};

module.exports.updateEvent = async (eventId, data) => {
  console.info(['db.api.updateEvent'], eventId, data);
  await EventModel.findByIdAndUpdate(eventId, {
    title: data.title,
    description: data.description,
    notification: data.notification,
    time: moment(data.time).toDate(),
  });

  return eventId;
};

module.exports.deleteEvent = async (eventId) => {
  console.info(['db.api.deleteEvent'], eventId);
  await EventModel.findByIdAndRemove(eventId);

  return eventId;
};

module.exports.getSubscriptions = async (userId) => {
  console.info(['db.api.getSubscriptions'], userId);
  const subscriptions = await SubscriptionModel.find({ userId });
  console.info(['db.api.getSubscriptions'], subscriptions);

  return subscriptions.map(doc => doc.toJSON());
};

module.exports.addSubscription = async (userId, data) => {
  console.info(['db.api.addSubscription'], userId, data);
  const doc = new SubscriptionModel({ userId, data });

  await doc.save();

  return doc._id;
};

module.exports.deleteSubscription = async (subscriptionId) => {
  console.info(['db.api.deleteSubscription'], subscriptionId);
  await SubscriptionModel.findByIdAndRemove(subscriptionId);

  return subscriptionId;
};

module.exports.getOrCreateUser = (userId, cb) => {
  console.info(['db.api.getOrCreateUser'], userId);
  UserModel.findOneAndUpdate({ userId }, { $set: { userId }}, { upsert: true  }, function (err, user) {

    return cb(err, { userId: user.userId });
  });
};

