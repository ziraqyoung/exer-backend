const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, require: true },
  date: { type: Date, required: true },
}, {
    timestamps: true
  });

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  children: [exerciseSchema]

}, {
    timestamps: true
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
