const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        booking: newBooking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getMyBookings = async (req, res) => {
  // !! NOT WORKING - Cannot access user.id property !!
  const bookings = await Booking.find({ id: req.body.id });

  if (!bookings.length) {
    return res.status(200).json({
      status: 'fail',
      message: 'No bookings for that user.',
    });
  }

  try {
    res.status(200).json({
      status: 'success',
      data: {
        bookings,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getSingleBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'No booking found.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    res.status(200).json({
      status: 'success',
      data: {
        booking: updatedBooking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
