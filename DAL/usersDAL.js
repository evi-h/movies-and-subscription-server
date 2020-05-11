const UsersModel = require("../models/users/usersModel");
const jsonfile = require("jsonfile");

exports.getAllUsers = () => jsonfile.readFile("data/users.json");

exports.getPermissions = () => jsonfile.readFile("data/permissions.json");

exports.getUserByUsername = (username) => UsersModel.findOne({ username });
