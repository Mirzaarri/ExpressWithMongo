const mongoose = require('mongoose');
const { isEmail, isIn } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
  },
  token: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // You can customize the roles based on your application needs
    default: 'user', // Default role is set to 'user'
  },
});

module.exports = mongoose.model('Login', userSchema);