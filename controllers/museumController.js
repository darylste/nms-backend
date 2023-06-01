const Museum = require('../models/museumsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Event = require('../models/eventModel');
const Booking = require('../models/bookingModel');

exports.createMuseum = catchAsync(async (req, res, next) => {
  const museum = await Museum.create({
    name: req.body.name,
    location: req.body.location,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    imgUrl: req.body.imgUrl,
    imgAlt: req.body.imgAlt,
    imgGallery: req.body.imgGallery,
  });

  res.status(201).json({
    status: 'success',
    data: {
      museum,
    },
  });
});

exports.getAllMuseums = catchAsync(async (req, res, next) => {
  const museums = await Museum.find();

  res.status(200).json({
    status: 'success',
    results: museums.length,
    data: {
      museums,
    },
  });
});

exports.getSingleMuseum = catchAsync(async (req, res, next) => {
  const museum = await Museum.find({ slug: req.params.slug });

  if (!museum.length) {
    return next(new AppError('No museum found.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      museum,
    },
  });
});

exports.updateMuseum = catchAsync(async (req, res, next) => {
  console.log(req);
  const museum = await Museum.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!museum) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      museum,
    },
  });
});

exports.deleteMuseum = catchAsync(async (req, res, next) => {
  const museum = await Museum.findOneAndDelete(
    { slug: req.params.slug },
    req.params.id,
  );

  if (!museum) {
    return next(new AppError('No museum found with that ID.', 404));
  }

  const events = await Event.find({ hostMuseum: museum._id });

  console.log(events);

  events.map(async event => {
    await Booking.deleteMany({ event: event._id });
  });

  const deletedEvents = await Event.deleteMany({ hostMuseum: museum._id });

  console.log(deletedEvents);

  res.status(200).json({
    status: 'success',
  });
});
