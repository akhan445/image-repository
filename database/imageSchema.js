const mongoose = require('mongoose');

// defines the image object
const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    unique: true,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  imageBase64: {
    type: String,
    required: true
  }
});

module.exports = Image = mongoose.model('Image', imageSchema);
