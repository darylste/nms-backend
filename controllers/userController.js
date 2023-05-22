const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getSingleUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: '<SingleUser />',
    },
  });
};

exports.createUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      user: '<User />',
    },
  });
};

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: '<UpdatedUser />',
    },
  });
};

exports.deleteUser = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
