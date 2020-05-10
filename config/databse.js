const mongoose = require("mongoose");
const moviesBL = require("../models/movies/moviesBL");
const membersBL = require("../models/members/membersBL");

mongoose.connect("mongodb://localhost:27017/subscriptionDB");

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connecting to subscriptionDB succeeded!!!");
  moviesBL.reset();
  membersBL.reset();
});
