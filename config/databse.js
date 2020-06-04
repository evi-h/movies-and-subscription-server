const mongoose = require("mongoose");
const mongooseUsers = require("mongoose");
const moviesBL = require("../models/movies/moviesBL");
const membersBL = require("../models/members/membersBL");
const usersBL = require("../models/users/usersBL");

mongoose.connect("mongodb://localhost:27017/subscriptionDB");

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connecting to sunscriptionDB succeeded!!!");
  moviesBL.reset();
  membersBL.reset();
  usersBL.reset();
});
