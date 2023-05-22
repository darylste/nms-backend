const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventsAtMuseum,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllEvents)
  .post(protect, restrictTo('admin'), createEvent);
router
  .route('/:id')
  .get(getSingleEvent)
  .patch(protect, restrictTo('admin'), updateEvent)
  .delete(protect, restrictTo('admin'), deleteEvent);
router.route('/museum/:museum').get(getEventsAtMuseum);

module.exports = router;
