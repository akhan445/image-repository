const mongoose = require('mongoose');

//defines the user object
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = User = mongoose.model('User', userSchema);
