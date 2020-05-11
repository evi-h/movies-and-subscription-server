var express = require("express");
var router = express.Router();
const usersBL = require("../models/users/usersBL");

router.route("/").get(function (req, res, next) {
  usersBL.getAllUsers().then((data) => {
    console.log(data);
    let { users } = data;
    res.json(users);
  });
});

router.route("/user/:id").get(function (req, res, next) {
  let { id } = req.params;
  usersBL.getUserById(id).then((data) => {
    res.json(data);
  });
});

router.route("/login").post(function (req, res, next) {
  let { username, password } = req.body;
  usersBL.login(username, password).then((data) => {
    res.json(data);
  });
});

router.route("/addNewUser").post(function (req, res, next) {
  let user = req.body;
  usersBL.addNewUser(user).then((response) => {
    res.json(response);
  });
});

router.route("/update").post(function (req, res, next) {
  let user = req.body;
  usersBL.updateUser(user).then((response) => {
    res.json(response);
  });
});

router.route("/delete/:id").get(function (req, res, next) {
  let { id } = req.params;
  usersBL.deleteUser(id).then((data) => {
    res.json(data);
  });
});

module.exports = router;
