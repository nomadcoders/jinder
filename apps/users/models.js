"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserModel = new Schema({
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

UserModel.pre("save", async function(next) {
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
  // If the password has been modified, salt and hash it
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

UserModel.methods.comparePassword = async (canditatePassword, callback) => {
  const user = this;
  const matches = await bcrypt.compare(canditatePassword, user);
  if (matches) return true;
  return false;
};

module.exports = mongoose.model("User", UserModel);
