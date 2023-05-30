const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    timeBooked: {
      type: Date,
      default: new Date(),
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A booking must contain the user who booked.'],
    },
    event: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      required: [true, 'A booking must contain event which is booked.'],
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

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName emailAddress',
  }).populate({
    path: 'event',
    select:
      'name slug dateTime description standardAdultPrice standardChildPrice premiumAdultPrice premiumChildPrice',
  });

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

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
