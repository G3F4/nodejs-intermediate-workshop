const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: { unique: true, dropDups: true },
    required: true,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
