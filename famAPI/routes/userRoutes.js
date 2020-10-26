const express = require('express');
const User = require('../models/userModel');

const auth = require('../middleware/auth');

const router = express.Router();

//-------------------------------------------------------------
//get all users with route: '/api/v1/users/'
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'failed to get all users',
    });
  }
});
//-------------------------------------------------------------
//get specific user with route '/api/v1/users/id'
router.get('/:id', auth, async (req, res) => {
  try {
    //populate creates new querry
    const user = await User.findById(req.params.id).populate({
      path: 'memories',
      select: '-__v',
    });
    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User you requested not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Error getting user',
    });
  }
});

//update user
router.patch('/:id', (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
});

//delete user
router.delete('/:id', (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
});

module.exports = router;
