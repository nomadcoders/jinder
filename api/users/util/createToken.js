"use strict";

const jwt = require("jsonwebtoken");
const secret = require("../../../config");

const createToken = user => {
  return jwt.sign({ id: user._id, username: user.username }, secret, {
    algorithm: "HS256"
  });
};

module.exports = createToken;
