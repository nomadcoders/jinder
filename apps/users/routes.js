"use strict";

const Router = require("koa-router");
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("./models");
const config = require("../../config");
const router = new Router({
  prefix: "/api/users"
});

router.post("/", async (ctx, next) => {
  // Grab the data from the request body
  const { email, name, password } = ctx.request.body;
  // Check if all the fields are on the request
  if (!email || !name || !password) {
    ctx.throw(HttpStatus.BAD_REQUEST, "All fields are required");
  }
  // Try to find an existing user, if found, return error and abort
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    ctx.throw(
      HttpStatus.BAD_REQUEST,
      "There is an account with that email address already"
    );
  }
  // Create a new user
  const newUser = await User.create({
    email,
    name,
    password
  });
  if (!newUser) {
    ctx.throw(HttpStatus.INTERNAL_SERVER_ERROR);
  }
  // Return created user
  ctx.body = { user: newUser };
});

router.post("/login", async (ctx, next) => {
  // Grab the data from the request body
  const { email, password } = ctx.request.body;
  if (!email || !password) {
    ctx.throw(HttpStatus.BAD_REQUEST, "All fields are required");
  }
  const user = await User.findOne({ email });
  if (user) {
    const samePassword = await user.comparePassword(password);
    if (samePassword) {
      const token = jwt.sign({ email: user.email }, config.key);
      ctx.body = {
        token
      };
    } else {
      ctx.throw(HttpStatus.UNAUTHORIZED, "Authentication failed");
    }
  } else {
    ctx.throw(HttpStatus.BAD_REQUEST, "User not found");
  }
});

router.get("/me", async (ctx, next) => {
  const { email } = ctx.state.user;
  const user = await User.findOne({ email }).select("-password");
  if (user) {
    ctx.body = user;
  }
});

module.exports = router;
