const express = require('express');
const {
  createBooking,
  getMyBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

const router = express.Router();

router.route('/').get(getMyBookings).post(createBooking);
router
  .route('/:id')
  .get(getSingleBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;
