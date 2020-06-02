var express = require("express");
var router = express.Router();
const subscriptionsBL = require("../models/subscriptions/subscriptionsBL");

router.route("/").get(function (req, res, next) {
  subscriptionsBL.getAllMembers().then((data) => {
    res.json(data);
  });
});

router.route("/addNewSubscription").post(function (req, res, next) {
  let subscription = req.body;
  subscriptionsBL.addNewSubscription(subscription).then((response) => {
    res.json(response);
  });
});

router.route("/update").put(function (req, res, next) {
  let subscription = req.body;
  subscriptionsBL.updateSubscription(subscription).then((response) => {
    res.json(response);
  });
});

router.route("/addSubscription").put(function (req, res, next) {
  let { movie, _id } = req.body;

  subscriptionsBL.addSubscription(movie, _id).then((response) => {
    res.json(response);
  });
});

router.route("/delete/:id").delete(function (req, res, next) {
  let { id } = req.params;
  subscriptionsBL.deleteSubscription(id).then((data) => {
    res.json(data);
  });
});

module.exports = router;
