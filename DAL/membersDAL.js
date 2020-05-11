const axios = require("axios");
const MembersModel = require("../models/members/membersModel");

exports.getMembersWebService = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

exports.getAllMembers = () => {
  return MembersModel.find();
};
