"use strict";

const bcrypt = require("bcrypt");
const Boom = require("boom");
const User = require("../model/User");
const createUserSchema = require("../schemas/createUser");
const verifyUniqueUser = require("../util/userFunctions").verifyUniqueUser;
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
  config: {
    pre: [{ method: verifyUniqueUser, assign: "isUnique" }],
    handler: (request, h) => {
      if (!request.pre.isUnique) {
        return h.response(Boom.badRequest("Email taken").output);
      }
      let user = new User();
      const { email, name, password } = request.payload;
      user.email = email;
      user.name = name;
      hashPassword(password, (err, hash) => {
        if (err) {
          throw Boom.badRequest();
        }
        user.password = hash;
        user.save((err, user) => {
          if (err) {
            throw Boom.badRequest();
          }
          res.response({ id_token: createToken(user) }).code(201);
        });
      });
    }
  }
};
