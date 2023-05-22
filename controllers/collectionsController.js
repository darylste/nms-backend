const Collection = require('../models/collectionsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createCollection = catchAsync(async (req, res, next) => {
  const collection = await Collection.create({
    name: req.body.name,
    hostMuseum: req.body.hostMuseum,
    description: req.body.description,
  });

  res.status(201).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

exports.getAllCollections = catchAsync(async (req, res, next) => {
  const collections = await Collection.find();

  res.status(200).json({
    status: 'success',
    results: collections.length,
    data: {
      collections,
    },
  });
});

exports.getSingleCollection = catchAsync(async (req, res, next) => {
  const collection = await Collection.findById(req.params.id);

  if (!collection) {
    return next(new AppError('No collection found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

exports.updateCollection = catchAsync(async (req, res, next) => {
  const collection = await Collection.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!collection) {
    return next(new AppError('No collecion found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

exports.deleteCollection = catchAsync(async (req, res, next) => {
  const collection = await Collection.findByIdAndDelete(req.params.id);

  if (!collection) {
    return next(new AppError('No collection found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
