const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');

const app = express();

const rateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 2 minutes)
  message: 'Too many requests from this IP. Please try again later',
});

// Middleware
app.use(rateLimiter);
app.use(morgan('dev'));
app.use(xss()); // Invoke the xss middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the E-commerce Server.',
  });
});

app.use('/api/users', userRouter);

// Client Error Handling:
app.use((req, res, next) => {
  next(createError(404, 'Router not found'));
});

// Server Error Handling:
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
