const mongoose = require("mongoose");

const env = process.env.npm_lifecycle_event;

if (env === "local") {
  mongoose.connect("mongodb://localhost/jinder", {
    useMongoClient: true
  });
} else {
  // add remote MongoDB connection here
}

const db = mongoose.connection;

db.on("error", () => console.error("Connection error ❌"));
db.once("open", () => console.log("Connected to the database ✅"));

exports.db = db;
