const express = require('express');

const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./middleware/error');

app.use(express.json()); //middleware that add the request data to the req object

app.use('/api/v1/memories', require('./routes/memoryRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
//if no router catches the request this one will
//* means catch all requests
app.all('*', (req, res, next) => {
  //if the next function receives an argument - node will know that there was an error
  next(new AppError(`Can't find the route ${req.originalUrl}`));
});
//error handling middleware - will be activated each time next(err) is happening
app.use(globalErrorHandler);

module.exports = app;
