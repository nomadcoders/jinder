"use strict";

const bcrypt = require("bcrypt");
const Boom = require("boom");
const User = require("../model/User");
const createUserSchema = require("../schemas/createUser");
const createToken = require("../util/createToken");

const hashPassword = async (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
};

module.exports = {
  method: "POST",
  path: "/api/users",
  handler: (request, h) => {
    const { email, name, password } = request.payload;

    const existingUser = User.findOne({ email }, (err, user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });

    if (existingUser) {
      return h.response(Boom.badRequest("Email is already taken").output);
    } else {
      // create user
    }
  }
};
