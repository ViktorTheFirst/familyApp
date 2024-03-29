module.exports = (err, req, res, next) => {
  //define default error if no status was passed
  err.statusCode = err.statusCode || 500; //internal server error
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
