const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const monogSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const eventRouter = require('./routes/eventRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const userRouter = require('./routes/userRoutes');
const museumRouter = require('./routes/museumRoutes');
const collectionRouter = require('./routes/collectionRoutes');

const app = express();

// NPM package for security headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate Limiting: prevent brute force and DDOS attacks.

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests. Try again later.',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

// Sanitize:
// protect against NoSQL Injection
app.use(monogSanitize());
// protect against XSS
app.use(xss());

// protect against paramiter pollution
app.use(hpp());

app.use('/api/v1/events', eventRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/museums', museumRouter);
app.use('/api/v1/collections', collectionRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
