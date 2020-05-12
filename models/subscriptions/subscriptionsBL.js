const SubscriptionsModel = require("./subscriptionsModel");
const subscriptionsDAL = require("../../DAL/subscriptionsDAL");

exports.getAllSubscriptions = async () =>
  await subscriptionsDAL.getAllSubscriptions();

exports.addNewSubscription = async (subscription) => {
  let newSubscription = new SubscriptionsModel(subscription);
  console.log(newSubscription);
  await newSubscription.save((err) => {
    if (err) return err;
  });

  return "OK";
};
