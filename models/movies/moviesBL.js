const moviesDAL = require("../../DAL/moviesDAL");
const MoviesModel = require("../movies/moviesModel");

exports.reset = async () => {
  let { data } = await moviesDAL.getMoviesWebService();

  await MoviesModel.deleteMany();

  let movies = data.map((movie) => {
    return new MoviesModel({
      Name: movie.name,
      Genres: movie.genres,
      Image: movie.image.original,
      Premiered: movie.premiered,
    });
  });

  MoviesModel.insertMany(movies);
};

exports.getAllMovies = async () => await moviesDAL.getAllMovies();

exports.getMovieById = async (id) => await moviesDAL.getMovieById(id);

exports.addNewMovie = async (movie) => {
  let newMovie = new MoviesModel(movie);

  await newMovie.save((err) => {
    if (err) return err;
  });
  return "OK";
};

exports.updateMovie = async (movie) => {
  await MoviesModel.updateOne({ _id: movie._id }, movie, (err) => {
    if (err) return err;
  });
  return "OK";
};

exports.deleteMovie = async (_id) => {
  await MoviesModel.deleteOne({ _id }, (err) => {
    if (err) return err;
  });
  return "OK";
};
