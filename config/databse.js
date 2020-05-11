const mongoose = require("mongoose");
const mongooseUsers = require("mongoose");
const moviesBL = require("../models/movies/moviesBL");
const membersBL = require("../models/members/membersBL");
const usersBL = require("../models/users/usersBL");

mongoose.connect("mongodb://localhost:27017/subscriptionDB");
mongooseUsers.connect("mongodb://localhost:27017/usersDB");

const db = mongoose.connection;
const usersDB = mongooseUsers.connection;

db.once("open", () => {
  console.log("Connecting to sunscriptionDB succeeded!!!");
  moviesBL.reset();
  membersBL.reset();
});

usersDB.once("open", () => {
  console.log("Connecting to usersDB succeeded!!!");
  usersBL.reset();
});
