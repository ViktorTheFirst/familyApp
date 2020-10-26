const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');

module.exports = async function (req, res, next) {
  try {
    let token;
    if (req.header('authorization')) {
      token = req.header('authorization');
    }
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'unauthorized, log in first',
      });
    }
    //check that the given token is correct
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check if the user with teh given token still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'user is no longer exists',
      });
    }
    //put all the data to teh request
    req.user = freshUser;
    //access to protected route is granted
    next();
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      error: err,
    });
  }
};

/* //middleware that activates only for URL with id param
router.param('id', (req, res, next, val) => {
    if (val > memories.length) {
      return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    }
    next();
  }); */
