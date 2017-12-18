"use strict";

const Router = require("koa-router");
const HttpStatus = require("http-status-codes");
const User = require("./models");
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
  ctx.body = { user: newUser };
});

module.exports = router;
