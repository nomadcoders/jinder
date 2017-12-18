"use strict";

const Router = require("koa-router");
const User = require("./models");
const router = new Router({
  prefix: "/api/users"
});

router.post("/create", (ctx, next) => {});

module.exports = router;
