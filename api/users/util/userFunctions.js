"use strict";

const Boom = require("boom");
const User = require("../model/User");

const verifyUniqueUser = (request, h) => {
  try {
    const query = User.findOne({ email: "hello" }).exec();
    return false;
  } catch (err) {
    return true;
  }
};

module.exports = {
  verifyUniqueUser
};
