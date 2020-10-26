const express = require('express');

const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  //these functions will be executed whenever a file is recieved
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('not an image', false);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });
const User = require('../models/userModel');
const Memory = require('../models/memoryModel');

//------------------------------------------------------------------------------------
//get all memories with route: '/api/v1/memories/'
router.get('/', auth, async (req, res) => {
  try {
    //if we dont pass args to find() we get all the docs in the collection
    const memories = await Memory.find();
    res.status(200).json({
      status: 'success',
      results: memories.length,
      data: {
        memories,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
});
//------------------------------------------------------------------------------------
//get specific memory with route: '/api/v1/memories/id'
router.get('/:id', auth, async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        memory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
});
//------------------------------------------------------------------------------------
//post new memory image with route: '/api/v1/memories/image_upoad'
router.post(
  '/image_upload/:id',
  upload.single('memory_image'),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { profileImage: req.file.filename },
        {
          new: true,
        }
      );
      if (user) {
        res.status(200).json({
          status: 'success',
          message: 'image uploaded to the server',
          data: {
            user,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: 'error uploading an image',
      });
    }
  }
);

//------------------------------------------------------------------------------------
//post new memory with route: '/api/v1/memories/'
router.post('/', auth, async (req, res) => {
  try {
    const newMemory = await Memory.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        memory: newMemory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
      error: err,
    });
  }
});
//------------------------------------------------------------------------------------
//updates (patch) specific memory with route '/api/v1/memories/id'
router.patch('/:id', auth, async (req, res) => {
  try {
    const updatedMemory = await Memory.findByIdAndUpdate(
      req.params.id, // who we want to update
      req.body, //what we want to update
      { new: true, runValidators: true } //return new updated document
    );
    res.status(200).json({
      status: 'success',
      data: {
        updatedMemory,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
});

//------------------------------------------------------------------------------------
//deletes specific memory with route '/api/v1/memories/id'
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedMemory = await Memory.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        deletedMemory,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
});

module.exports = router;
