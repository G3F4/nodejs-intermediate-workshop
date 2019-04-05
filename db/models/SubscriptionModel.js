const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: String,
  data: {
    endpoint : { type: String, index: { unique: true, dropDups: true }, required: true },
    expirationTime : String,
    keys : {
      p256dh : String,
      auth : String,
    },
  },
});

const SubscriptionModel = mongoose.model('Subscription', subscriptionSchema);

module.exports = SubscriptionModel;
