const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/userModel');
//const Memory = require('../models/memoryModel');

//------------------------------------------------------------------------------------
//REGISTER user with route: '/api/v1/auth/registration'
router.post('/registration', async (req, res) => {
  const { name, sureName, email, password } = req.body;
  try {
    //Check if the user already exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: 'fail',
        message: 'User with that email already exist',
      });
    }

    //create new user
    const newUser = await User.create({
      name,
      sureName,
      email,
      password,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      //TODO: figure out what type of error coming from user creation
      //can be minLength of pass or no name..
      //pass it to front end
      status: 'fail',
      message: 'Registration failed on server',
      error: err,
    });
  }
});

//------------------------------------------------------------------------------------
//LOGIN user with route: '/api/v1/auth/login'
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    const isCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isCorrect) {
      return res.status(401).json({
        status: 'fail',
        message: 'login failed incorrect password or email',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Login failed on server',
      error: err,
    });
  }
});

module.exports = router;
