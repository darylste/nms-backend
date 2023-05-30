const mongoose = require('mongoose');
const slugify = require('slugify');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A collection must have a name.'],
    unique: [true, 'A collection with that name already exists.'],
  },
  slug: {
    type: String,
  },
  hostMuseum: {
    type: mongoose.Schema.ObjectId,
    ref: 'Museum',
  },
  description: {
    type: Array,
    required: true,
  },
  imgUrl: {
    type: String,
    required: [true, 'A collection must have an image.'],
  },
  imgAlt: {
    type: String,
    required: [true, 'A collection image must have alternative text.'],
  },
});

collectionSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

collectionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'hostMuseum',
    select: 'name location',
  });

  next();
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
