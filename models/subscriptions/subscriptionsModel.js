const mongoose = require("mongoose");

var Schema = mongoose.Schema;

let subsriptionSchema = new Schema({
  MemberId: String,
  Movies: [{ movieId: String, date: Date }],
});

module.exports = mongoose.model("subscriptions", subsriptionSchema);
