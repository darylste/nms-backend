const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  event: {
    type: Object,
    required: true,
  },
  numStandardAdults: Number,
  numStandardChildren: Number,
  numPremiumAdults: Number,
  numPremiumChildren: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
