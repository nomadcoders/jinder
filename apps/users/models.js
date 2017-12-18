"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  created_at: Date,
  updated_at: Date
});

userModel.pre("save", next => {
  // Saving the 'this' into user
  const user = this;
  const currentDate = new Date();
  user.updated_at = currentDate;
  // Check if it is a new user
  if (!user.created_at) {
    user.created_at = currentDate;
  }
  // Check if the password has been modified
  if (!user.isModified("password")) {
    next();
  }
  // If the password has been modified, salt it
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    // Hash the password + salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
  next();
});

module.exports = mongoose.model("User", userModel);
