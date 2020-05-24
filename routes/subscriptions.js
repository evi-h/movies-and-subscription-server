var express = require("express");
var router = express.Router();
const subscriptionsBL = require("../models/subscriptions/subscriptionsBL");

router.route("/").get(function (req, res, next) {
  subscriptionsBL.getAllSubscriptions().then((data) => {
    res.json(data);
  });
});

router.route("/addNewSubscription").post(function (req, res, next) {
  let subscription = req.body;
  subscriptionsBL.addNewSubscription(subscription).then((response) => {
    res.json(response);
  });
});

module.exports = router;
