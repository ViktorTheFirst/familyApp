module.exports = function (req, res, next) {
  console.log('[checkBody middleware activated]');
  if (!req.body.description) {
    return res.status(400).json({
      status: 'fail',
      message: 'No description in the body',
    });
  }
  next();
};
