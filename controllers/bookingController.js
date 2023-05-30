const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.create({
    user: req.user.id,
    event: req.body.event,
    numStandardAdultTickets: req.body.numStandardAdultTickets,
    numStandardChildTickets: req.body.numStandardChildTickets,
    numPremiumAdultTickets: req.body.numPremiumAdultTickets,
    numPremiumChildTickets: req.body.numPremiumChildTickets,
  });

  res.status(201).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  if (!bookings.length) {
    return res.status(200).json({
      status: 'fail',
      message: 'No bookings found.',
    });
  }

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getSingleBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with this ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body);

  if (!booking) {
    return next(new AppError('No booking found with this ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with this ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
