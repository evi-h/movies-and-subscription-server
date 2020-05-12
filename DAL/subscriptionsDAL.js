const SubscriptionsModel = require("../models/subscriptions/subscriptionsModel");

exports.getAllSubscriptions = () => SubscriptionsModel.find();
