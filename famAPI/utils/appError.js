class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    //if a status code starts with a 4 - we have a fail message
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    //only operational errors will send result back to the client
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
