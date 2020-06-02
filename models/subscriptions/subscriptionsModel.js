const mongoose = require("mongoose");

var Schema = mongoose.Schema;

let subsriptionSchema = new Schema({
  MemberId: String,
  Movies: [],
});

module.exports = mongoose.model("subscriptions", subsriptionSchema);
