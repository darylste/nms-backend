const Event = require('../models/eventModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      event: newEvent,
    },
  });
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: { events },
  });
});

exports.getEventsAtMuseum = catchAsync(async (req, res, next) => {
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
});

exports.getSingleEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { event },
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { event },
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
