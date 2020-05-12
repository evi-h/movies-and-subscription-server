var express = require("express");
var router = express.Router();
const subscriptionsBL = require("../models/subscriptions/subscriptionsBL");

router.route("/").get(function (req, res, next) {
  subscriptionsBL.getAllSubscriptions().then((data) => {
    console.log(data);
    // let { subscriptions } = data;
    res.json(data);
  });
});

router.route("/addNewSubscription").post(function (req, res, next) {
  let subscription = req.body;
  subscriptionsBL.addNewSubscription(subscription).then((response) => {
    console.log(response);
    res.json(response);
  });
});

router.route("/update").post(function (req, res, next) {
  let subscription = req.body;
  subscriptionsBL.updatesubscription(subscription).then((response) => {
    res.json(response);
  });
});

router.route("/delete/:id").get(function (req, res, next) {
  let { id } = req.params;
  subscriptionsBL.deletesubscription(id).then((data) => {
    res.json(data);
  });
});

module.exports = router;
