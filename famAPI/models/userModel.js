const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have name'],
    minlength: 2,
  },
  sureName: {
    type: String,
    required: [true, 'User must have sureName'],
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, 'User must have email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must have password'],
    minlength: 6,
    select: false,
  },
  profileImage: {
    type: String,
    default: 'default.png',
  },
  location: {
    type: String,
    default: undefined,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  memories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Memory',
    },
  ],
});

//function that runs after data is recieved by the server but before it is saved
userSchema.pre('save', async function (next) {
  //only run this func if pass was modified
  if (!this.isModified('password')) return next();
  //hash the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/* //function to compare if the given pass on login match the original
userSchema.methods.correctPasword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
}; */

const User = mongoose.model('User', userSchema);

module.exports = User;
