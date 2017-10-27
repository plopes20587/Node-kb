const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const user = module.exports = mongoose.model('user', userSchema);
