const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: String,
  data: {
    endpoint : String,
    expirationTime : String,
    keys : {
      p256dh : String,
      auth : String,
    },
  },
});

const SubscriptionModel = mongoose.model('Subscription', subscriptionSchema);

module.exports = SubscriptionModel;
