const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/userModel');
const { sendConfirmationEmail } = require('../service/EmailService');

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

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    //send confirmation email
    const verificationResult = await sendConfirmationEmail(newUser, token);
    if (!verificationResult) {
      res.status(500).json({
        status: 'fail',
        message: 'Verification was not sent to user email',
      });
    }
    res.status(201).json({
      status: 'success',
      token,
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

router.get('/verify/:id', async (req, res) => {
  try {
    const { id } = req.params;

    //fetch the user we want to verify
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Login failed, incorrect verification token',
      });
    }
    //validate the user and store the validation on DB
    const validated = await User.findOneAndUpdate(
      { _id: id },
      { isConfirmed: true },
      { new: true }
    );

    if (validated) {
      return res.redirect(`http://localhost:3000/login`);
      //TODO: add a notification that says: "Email verification successfull"
    }
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: 'Validation failed on server',
    });
  }
});

//------------------------------------------------------------------------------------
//LOGIN user with route: '/api/v1/auth/login'
router.post('/login', async (req, res) => {
  try {
    let isCorrect = null;
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    //no need to check password if user not found
    if (user) {
      isCorrect = await bcrypt.compare(password, user.password);
    }

    if (!user || !isCorrect) {
      return res.status(401).json({
        status: 'fail',
        message: 'Login failed, incorrect password or email',
      });
    }

    if (!user.isConfirmed) {
      return res.status(401).json({
        status: 'fail',
        message: `Please confirm your registration at ${email} before logging in`,
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
