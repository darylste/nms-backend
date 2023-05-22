const express = require('express');
const {
  createBooking,
  getMyBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(protect, getMyBookings).post(protect, createBooking);
router
  .route('/:id')
  .get(protect, restrictTo('admin'), getSingleBooking)
  .patch(protect, restrictTo('admin'), updateBooking)
  .delete(protect, restrictTo('admin'), deleteBooking);

module.exports = router;
