const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { create } = require('domain');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
    ),
    // May need to change?
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  if (!firstName || !lastName || !emailAddress || !password) {
    return next(new AppError('Please complete all fields.', 400));
  }

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    return next(new AppError('Please provide email and password.', 400));
  }

  const user = await User.findOne({ emailAddress }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email address or password', 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Get JWT
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // return error if no JWT
  if (!token) {
    return next(
      new AppError('You must be logged in to preform this action.', 401),
    );
  }

  // check JWT is valid
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  // check user still exists (hasn't been deleted)
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return next(new AppError('User no longer exists...', 401));
  }

  // check if password was changed after JWT issued
  if (user.isTokenOlderThanPassword(decodedToken.iat)) {
    return next(
      new AppError('Password has been changed. Please login again.'),
      401,
    );
  }

  // continue to route
  req.user = user;
  next();
});

exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403),
      );
    }
    next();
  };
};
