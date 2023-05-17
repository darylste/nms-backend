const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (!events.length) {
      res.status(404).json({
        status: 'fail',
        message: 'No events found.',
      });
    }
    res.status(200).json({
      status: 'success',
      results: events.length,
      data: { events },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getEventsAtMuseum = async (req, res) => {
  try {
    const museum = req.params.museum.split('-').join(' ');
    const events = await Event.find({ hostMuseum: museum });
    if (!events.length) {
      res.status(404).json({
        status: 'fail',
        message: 'No events found.',
      });
    }
    res.status(200).json({
      status: 'success',
      results: events.length,
      data: {
        events,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { event },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { event },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
