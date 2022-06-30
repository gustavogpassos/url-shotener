
//save this file as database.js

module.exports = function (app) {
  const mongoose = require("mongoose");
  mongoose.connect(
    "**mongo-connection-string**"
  ).then(() => {
    console.log("Connected to mongoDB");
  }).catch((err) => {
    console.log(err);
  });
}