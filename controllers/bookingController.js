const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  // ###### Needs tested ###### //
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

exports.getAllBookings = async (req, res) => {
  // ###### Needs tested ###### //

  try {
    const bookings = await Booking.find();

    if (!bookings.length) {
      res.status(404).json({
        status: 'fail',
        message: 'No bookings found.',
      });
    }

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
  // ###### Needs tested ###### //
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking.length) {
      res.status(404).json({
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
  // ###### Needs tested ###### //
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
  // ###### Needs tested ###### //
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

exports.getMyBookings = async (req, res) => {
  // why doesn't dot or bracket notation work??
  // const bookings = await Booking.find({ user.firstName: req.body.name });
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
