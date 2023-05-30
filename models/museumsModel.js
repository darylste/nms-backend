const mongoose = require('mongoose');
const slugify = require('slugify');

const museumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A museum must have a name.'],
    unique: true,
  },
  slug: {
    type: String,
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
  imgUrl: {
    type: String,
    required: [true, 'A museum must have an image.'],
  },
  imgAlt: {
    type: String,
    required: [true, 'Museum image must have alternative text'],
  },
  imgGallery: {
    type: Array,
    required: [true, 'An event must have a gallery of images.'],
  },
});

museumSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

const Museum = mongoose.model('Museum', museumSchema);

module.exports = Museum;
