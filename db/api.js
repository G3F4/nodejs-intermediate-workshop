const moment = require('moment-timezone');
const EventModel = require('./models/EventModel');
const SubscriptionModel = require('./models/SubscriptionModel');
const UserModel = require('./models/UserModel');

module.exports.getMonth = async (userId, date) => {
  try {
    console.info(['db.api.getMonth'], userId, date);
    const result = await EventModel.find({ userId });

    const startDateMoment = moment(date).startOf('month').startOf('week');

    return Array.from({ length: 7 * 6 }).map(() => {
      const date = startDateMoment.add(1, 'day').format('YYYY-MM-DD');

      return {
        date,
        events: (result.filter(doc => date === moment(doc.time).format('YYYY-MM-DD')) || [])
          .map(({ title, _id }) => ({ title, id: _id })),
      };
    });
  } catch (e) {
    throw new Error(`api:error | getMonth | ${e}`);
  }
};

module.exports.getDayEvents = async (userId, date) => {
  try {
    const $gte = moment(date).startOf('day').toDate();
    const $lte = moment(date).endOf('day').toDate();

    const events = await EventModel.find({
      time: { $gte, $lte },
    });

    return events.map(doc => ({
      id: doc._id,
      description: doc.description,
      time: moment(doc.time).format('YYYY-MM-DDTHH:mm'),
      title: doc.title,
      notification: doc.notification,
    }));
  } catch (e) {
    throw new Error(`api:error | getDayEvents | ${e}`);
  }
};

module.exports.addEvent = async (userId, data) => {
  try {
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
  } catch (e) {
    throw new Error(`api:error | addEvent | ${e}`);
  }
};

module.exports.updateEvent = async (eventId, data) => {
  try {
    console.info(['db.api.updateEvent'], eventId, data);
    await EventModel.findByIdAndUpdate(eventId, {
      title: data.title,
      description: data.description,
      notification: data.notification,
      time: moment(data.time).toDate(),
    });

    return eventId;
  } catch (e) {
    throw new Error(`api:error | updateEvent | ${e}`);
  }
};

module.exports.deleteEvent = async (eventId) => {
  try {
    console.info(['db.api.deleteEvent'], eventId);
    await EventModel.findByIdAndRemove(eventId);

    return eventId;
  } catch (e) {
    throw new Error(`api:error | deleteEvent | ${e}`);
  }
};

module.exports.getSubscriptions = async (userId) => {
  try {
    console.info(['db.api.getSubscriptions'], userId);
    const subscriptions = await SubscriptionModel.find({ userId });
    console.info(['db.api.getSubscriptions'], subscriptions);

    return subscriptions.map(doc => doc.toJSON());
  } catch (e) {
    throw new Error(`api:error | getSubscriptions | ${e}`);
  }
};

module.exports.getOrCreateUser = (userId, cb) => {
  try {
    console.info(['db.api.getOrCreateUser'], userId);
    UserModel.findOneAndUpdate({ userId }, { $set: { userId }}, { upsert: true  }, function (err, user) {

      return cb(err, { userId: user.userId });
    });
  } catch (e) {
    throw new Error(`api:error | getOrCreateUser | ${e}`);
  }
};

module.exports.addSubscription = async (userId, data) => {
  try {
    console.info(['db.api.addSubscription'], userId, data);
    const doc = new SubscriptionModel({ userId, data });

    await doc.save();

    return doc._id;
  } catch (e) {
    throw new Error(`api:error | addSubscription | ${e}`);
  }
};

module.exports.deleteSubscription = async (subscriptionId) => {
  try {
    console.info(['db.api.deleteSubscription'], subscriptionId);
    await SubscriptionModel.findByIdAndRemove(subscriptionId);

    return subscriptionId;
  } catch (e) {
    throw new Error(`api:error | deleteSubscription | ${e}`);
  }
};

module.exports.getEventsWithinNextMinuteWithActiveNotification = async () => {
  try {
    const $gte = moment(Date.now()).startOf('day').toDate();
    const $lte = moment(Date.now()).add(1, 'day').toDate();
    const events = await EventModel.find({
      time: { $gte, $lte },
      notification: true,
    });

    return events.map(doc => doc.toJSON());
  } catch (e) {
    throw new Error(`api:error | getEventsWithinNextMinuteWithActiveNotification | ${e}`);
  }
};
