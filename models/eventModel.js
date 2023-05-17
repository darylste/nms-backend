const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An event must have a name.'],
    unique: [true, 'There is already an event with that name.'],
    trim: true,
  },
  hostMuseum: {
    type: String,
    required: [true, 'An event must have a host museum.'],
  },
  heroImg: {
    type: String,
    required: [true, 'An event must have a hero image.'],
  },
  dateTime: {
    type: Date,
    required: [true, 'An event must have a date and time.'],
  },
  description: {
    type: Array,
    required: [true, 'An event must have a description.'],
    trim: true,
  },
  features: {
    type: Array,
    required: [true, 'An event must have features'],
  },
  standardAdultPrice: {
    type: Number,
    required: [true, 'An event must have a standard adult ticket price.'],
  },
  standardChildPrice: {
    type: Number,
    required: [true, 'An event must have a standard child ticket price.'],
  },
  premiumAdultPrice: {
    type: Number,
    required: [true, 'An event must have a premium adult ticket price.'],
  },
  premiumChildPrice: {
    type: Number,
    required: [true, 'An event must have a premium child ticket price.'],
  },
  reviews: {
    type: Object,
    required: [true, 'An event must have a review.'],
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
