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
