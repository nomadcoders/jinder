const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const convert = require("koa-convert");
const koaRes = require("koa-res");
const combineRouters = require("koa-combine-routers");
const db = require("./db");

// Import routers

const userRouter = require("./apps/users/routes");

// Create the App and router
const app = new Koa();

// Save DB to context

app.context.db = db;

// Handle errors

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

// Log stuff

app.use(logger());

// Parse the body

app.use(bodyParser());

// Format responses to JSON

app.use(convert(koaRes()));

// Combine Routers

const router = combineRouters([userRouter]);

app.use(router);

// Listen to port
const port = process.env.PORT || 3000;

try {
  app.listen(port);
  console.log("Server running on port", port, "✅");
} catch (err) {
  console.log(err);
}
