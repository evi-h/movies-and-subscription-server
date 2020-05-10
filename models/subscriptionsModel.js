const mongoose = require("mongoose");
const movieSchema = require("./movies/moviesModel");

var Schema = mongoose.Schema;

let subsriptionSchema = new Schema({
  MemberId: String,
  Movies: [movieSchema],
});

module.exports = mongoose.model("subsriptions", subsriptionSchema);
