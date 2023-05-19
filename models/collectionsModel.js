const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: String,
  museum: String,
  description: Array,
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
