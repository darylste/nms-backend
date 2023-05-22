const Museum = require('../models/museumsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createMuseum = catchAsync(async (req, res, next) => {
  const museum = await Museum.create({
    name: req.body.name,
    location: req.body.location,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
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
  const museum = await Museum.findById(req.params.id);

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

exports.updateMuseum = catchAsync(async (req, res, next) => {
  const museum = await Museum.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

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
  const museum = await Museum.findByIdAndDelete(req.params.id);

  if (!museum) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
