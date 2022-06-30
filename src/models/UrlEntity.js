const mongoose = require("mongoose");

const schema = mongoose.Schema({
  baseUrl: String,
  urlHash: String,
  dateCreated: {
    type: Date,
    default: new Date()
  },
  dateExpires: {
    type: Date,
    default: new Date(+new Date() + 24*60*60*1000)
  }
});

const UrlEntity = mongoose.model("UrlEntity", schema);

module.exports = UrlEntity;