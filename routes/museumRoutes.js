const express = require('express');
const {
  createMuseum,
  getAllMuseums,
  getSingleMuseum,
  updateMuseum,
  deleteMuseum,
} = require('../controllers/museumController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllMuseums)
  .post(protect, restrictTo('admin'), createMuseum);
router
  .route('/:id')
  .get(getSingleMuseum)
  .patch(protect, restrictTo('admin'), updateMuseum)
  .delete(protect, restrictTo('admin'), deleteMuseum);

module.exports = router;
