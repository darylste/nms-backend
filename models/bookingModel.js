const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    timeBooked: {
      type: Date,
      default: new Date(),
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
    numStandardAdultTickets: {
      type: Number,
      required: true,
    },
    numStandardChildTickets: {
      type: Number,
      required: true,
    },
    numPremiumAdultTickets: {
      type: Number,
      required: true,
    },
    numPremiumChildTickets: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

bookingSchema.virtual('totalPrice').get(function () {
  return (
    (
      this.event.standardAdultPrice * this.numStandardAdultTickets +
      this.event.standardChildPrice * this.numStandardChildTickets +
      this.event.premiumAdultPrice * this.numPremiumAdultTickets +
      this.event.premiumChildPrice * this.numPremiumChildTickets
    ).toFixed(2) * 1
  );
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
