"use strict";

const mongoose = require("mongoose");

const env = process.env.NODE_ENV;

if (env === "production") {
  // add db connection
} else {
  mongoose.connect("mongodb://localhost/jinder", { useMongoClient: true });
}

const db = mongoose.connection;

db.on("error", () => console.error("Connection error ❌"));
db.once("open", () => console.log("Connected to the database ✅"));

exports.db = db;
