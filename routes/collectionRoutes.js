const express = require('express');
const {
  createCollection,
  getAllCollections,
  getSingleCollection,
  updateCollection,
  deleteCollection,
} = require('../controllers/collectionsController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllCollections)
  .post(protect, restrictTo('admin'), createCollection);
router
  .route('/:id')
  .get(getSingleCollection)
  .patch(protect, restrictTo('admin'), updateCollection)
  .delete(protect, restrictTo('admin'), deleteCollection);

module.exports = router;
