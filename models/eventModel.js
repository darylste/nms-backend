const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An event must have a name.'],
    unique: [true, 'There is already an event with that name.'],
    trim: true,
    minlength: 5,
  },
  slug: {
    type: String,
  },
  hostMuseum: {
    type: mongoose.Schema.ObjectId,
    ref: 'Museum',
    required: [true, 'An event must have a host museum.'],
  },
  imgUrl: {
    type: String,
    required: [true, 'An event must have an image.'],
  },
  imgAlt: {
    type: String,
    required: [true, 'Event image must have alternative text.'],
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
  standardBenefits: {
    type: Array,
    required: [true, 'An event must include standard ticket benefits.'],
  },
  premiumBenefits: {
    type: Array,
    required: [true, 'An event must include premium ticket benefits.'],
  },
  reviews: {
    type: Object,
    required: [true, 'An event must have a review.'],
  },
});

eventSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

eventSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'hostMuseum',
    select: 'name location slug',
  });

  next();
});

eventSchema.pre('find', function (next) {
  next();
});
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
