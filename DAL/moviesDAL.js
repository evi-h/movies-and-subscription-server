const axios = require("axios");
const MoviesModel = require("../models/movies/moviesModel");

exports.getMoviesWebService = () => {
  return axios.get("https://api.tvmaze.com/shows");
};

exports.getAllMovies = () => MoviesModel.find();

exports.getMovieById = (_id) => MoviesModel.findOne({ _id });
