var express = require("express");
var router = express.Router();
const membersBL = require("../models/members/membersBL");

router.route("/").get(function (req, res, next) {
  membersBL.getAllMembers().then((data) => {
    res.json(data);
  });
});

router.route("/member/:id").get(function (req, res, next) {
  let { id } = req.params;
  membersBL.getMemberById(id).then((data) => {
    res.json(data);
  });
});

router.route("/addNewMember").post(function (req, res, next) {
  let member = req.body;
  membersBL.addNewMember(member).then((response) => {
    res.json(response);
  });
});

router.route("/update").put(function (req, res, next) {
  let member = req.body;
  membersBL.updateMember(member).then((response) => {
    res.json(response);
  });
});

router.route("/delete/:id").delete(function (req, res, next) {
  let { id } = req.params;
  membersBL.deleteMember(id).then((data) => {
    res.json(data);
  });
});

module.exports = router;
