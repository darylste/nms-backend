const express = require('express');
const morgan = require('morgan');

const eventRouter = require('./routes/eventRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/events', eventRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
