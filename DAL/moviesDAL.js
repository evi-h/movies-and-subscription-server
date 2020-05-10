const axios = require("axios");

exports.getMoviesWebService = () => {
  return axios.get("https://api.tvmaze.com/shows");
};
