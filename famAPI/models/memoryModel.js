const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Memory must have description'],
  },
  imageURL: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Memory = mongoose.model('Memory', memorySchema);

module.exports = Memory;
