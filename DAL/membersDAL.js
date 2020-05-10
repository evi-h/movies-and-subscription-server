const axios = require("axios");

exports.getMembersWebService = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};
