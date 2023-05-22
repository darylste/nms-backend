const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A collection must have a name.'],
    unique: [true, 'A collection with that name already exists.'],
  },
  hostMuseum: {
    type: mongoose.Schema.ObjectId,
    ref: 'Museum',
  },
  description: Array,
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
