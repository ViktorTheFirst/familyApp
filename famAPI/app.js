const express = require('express');

const app = express();
app.use(express.json()); //middleware that add the request data to the req object

/* app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
}); */

/* app.use((req,res,next) => {
    console.log('our middleware activated');
    next();
}) */

app.use('/api/v1/memories', require('./routes/memoryRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));

module.exports = app;
