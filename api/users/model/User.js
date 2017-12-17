"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  name: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String
  }
});

module.exports = mongoose.model("User", userModel);
