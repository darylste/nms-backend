const mongoose = require('mongoose');

const museumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A museum must have a name.'],
    unique: true,
  },
  location: {
    type: String,
    required: [true, 'A museum must have a location.'],
  },
  shortDescription: {
    type: Array,
    required: [true, 'A museum must have a short description'],
  },
  longDescription: {
    type: Array,
    required: [true, 'A museum must have a long description'],
  },
});

const Museum = mongoose.model('Museum', museumSchema);

module.exports = Museum;
