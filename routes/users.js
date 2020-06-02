var express = require("express");
var router = express.Router();
const usersBL = require("../models/users/usersBL");

router.route("/").get(function (req, res, next) {
  usersBL.getAllUsersWithPermmissions().then((data) => {
    res.json(data);
  });
});

router.route("/user/:id").get(function (req, res, next) {
  let { id } = req.params;
  usersBL.getUserById(id).then((data) => {
    res.json(data);
  });
});

router.route("/login").post(function (req, res, next) {
  let { Username, Password } = req.body;
  usersBL.login(Username, Password).then((data) => {
    res.json(data);
  });
});

router.route("/addNewUser").post(function (req, res, next) {
  let user = req.body;
  usersBL.addNewUser(user).then((response) => {
    res.json(response);
  });
});

router.route("/update").put(function (req, res, next) {
  let user = req.body;
  usersBL.updateUser(user).then((response) => {
    res.json(response);
  });
});

router.route("/delete/:id").delete(function (req, res, next) {
  let { id } = req.params;
  usersBL.deleteUser(id).then((data) => {
    res.json(data);
  });
});

module.exports = router;
