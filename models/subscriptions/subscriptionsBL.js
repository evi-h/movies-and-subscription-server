const SubscriptionsModel = require("./subscriptionsModel");
const subscriptionsDAL = require("../../DAL/subscriptionsDAL");
const membersBL = require("../members/membersBL");

exports.getAllSubscriptions = async () => {
  let subscriptions = await subscriptionsDAL.getAllSubscriptions();
  subscriptions = await Promise.all(
    subscriptions.map(async (subscriber) => {
      let member = await membersBL.getMemberById(subscriber.id);
      let name = await (member ? `${member.Name}` : "");
      let { id, Movies } = subscriber;
      return { id, Movies, name };
    })
  );
  return subscriptions;
};

exports.addNewSubscription = async (subscription) => {
  let newSubscription = new SubscriptionsModel(subscription);
  await newSubscription.save((err) => {
    if (err) return err;
  });

  return "OK";
};
