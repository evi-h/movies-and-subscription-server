const mongoose = require("mongoose");

var Schema = mongoose.Schema;

let memberSchema = new Schema({
  Name: String,
  Email: String,
  City: String,
});

module.exports = mongoose.model("members", memberSchema);
