const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name.'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name.'],
  },
  emailAddress: {
    type: String,
    required: [true, 'Please enter an email address.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match.',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 13);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
