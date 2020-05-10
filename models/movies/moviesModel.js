const mongoose = require("mongoose");

var Schema = mongoose.Schema;

let movieSchema = new Schema({
  Name: String,
  Genres: [String],
  Image: String,
  Premiered: Date,
});

module.exports = mongoose.model("movies", movieSchema);
