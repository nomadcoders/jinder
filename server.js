"use strict";

const Hapi = require("hapi");
const secret = require("./config");
const glob = require("glob");
const path = require("path");

// Import the DB connection
const db = require("./db").db;

// Create the server
const server = new Hapi.Server({ port: 3000, host: "localhost" });

// Register the JWT

const registerJWT = async () => {
  try {
    await server.register({ plugin: require("./hapi-auth-jwt") });
    server.auth.strategy("jwt", "jwt", {
      key: secret,
      verifyOptions: { algorithms: ["HS256"] }
    });
    glob.sync("api/**/routes/*.js", { root: __dirname }).forEach(file => {
      const route = require(path.join(__dirname, file));
      server.route(route);
    });
  } catch (error) {
    console.log(error, "❌");
  }
};

// Start function
const start = async () => {
  try {
    await server.start();
  } catch (error) {
    console.log(error, "❌");
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri, "✅");
};

// Start the server
start();
registerJWT();
