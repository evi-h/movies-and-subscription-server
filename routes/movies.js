var express = require("express");
var router = express.Router();
const moviesBL = require("../models/movies/moviesBL");

router.route("/").get(function (req, res, next) {
  moviesBL.getAllMovies().then((data) => {
    res.json(data);
  });
});

router.route("/movie/:id").get(function (req, res, next) {
  let { id } = req.params;
  moviesBL.getMovieById(id).then((data) => {
    res.json(data);
  });
});

router.route("/addNewMovie").post(function (req, res, next) {
  let movie = req.body;
  moviesBL.addNewMovie(movie).then((response) => {
    res.json(response);
  });
});

router.route("/update").put(function (req, res, next) {
  let movie = req.body;
  moviesBL.updateMovie(movie).then((response) => {
    res.json(response);
  });
});

router.route("/delete/:id").delete(function (req, res, next) {
  let { id } = req.params;
  moviesBL.deleteMovie(id).then((data) => {
    res.json(data);
  });
});

module.exports = router;
