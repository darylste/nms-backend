const express = require('express');
const {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(protect, getAllBookings).post(protect, createBooking);
router
  .route('/:id')
  .get(protect, restrictTo('admin'), getSingleBooking)
  .patch(protect, restrictTo('admin'), updateBooking)
  .delete(protect, restrictTo('admin'), deleteBooking);

module.exports = router;
