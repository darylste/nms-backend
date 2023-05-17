const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventsAtMuseum,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const router = express.Router();

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:id').get(getSingleEvent).patch(updateEvent).delete(deleteEvent);
router.route('/museum/:museum').get(getEventsAtMuseum);

module.exports = router;
