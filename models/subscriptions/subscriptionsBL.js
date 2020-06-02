const SubscriptionsModel = require("./subscriptionsModel");
const subscriptionsDAL = require("../../DAL/subscriptionsDAL");
const membersBL = require("../members/membersBL");

exports.getAllSubscriptions = async () => {
  let subscriptions = await subscriptionsDAL.getAllSubscriptions();
  subscriptions = await Promise.all(
    subscriptions.map(async (subscriber) => {
      let member = await membersBL.getMemberById(subscriber.MemberId);
      let { Name, Email, City } = member;
      let { _id, Movies } = subscriber;
      return { _id, Movies, Name, Email, City };
    })
  );
  return subscriptions;
};

exports.getAllMembers = async () => {
  let subscriptions = await subscriptionsDAL.getAllSubscriptions();
  let members = await membersBL.getAllMembers();
  let membersAndSubscriptions = await Promise.all(
    members.map(async (member) => {
      let subscriber = subscriptions.filter(
        (sub) => sub.MemberId == member._id
      )[0];
      let { _id, Name, Email, City } = member;
      let Movies = subscriber ? subscriber.Movies : [];
      let MemberId = subscriber ? subscriber.MemberId : "";
      return { _id, Movies, Name, Email, City, MemberId };
    })
  );
  return membersAndSubscriptions;
};

exports.addNewSubscription = async (subscription) => {
  let { _id, Movies } = subscription;
  let newSub = { MemberId: _id, Movies };
  let newSubscription = new SubscriptionsModel(newSub);
  await newSubscription.save((err) => {
    if (err) return err;
  });

  return "OK";
};

exports.updateSubscription = async (subscription) => {
  let { MemberId, Movies } = subscription;
  await SubscriptionsModel.updateOne(
    { MemberId },
    { MemberId, Movies },
    (err) => {
      if (err) return err;
    }
  );
  return "OK";
};

exports.addSubscription = async (movie, _id) => {
  let subscription = await SubscriptionsModel.find({ _id });
  subscription = subscription[0];
  subscription.Movies.push(movie);
  await SubscriptionsModel.updateOne({ _id }, subscription, (err) => {
    if (err) return err;
  });
  return "OK";
};

exports.deleteSubscription = async (_id) => {
  await SubscriptionsModel.deleteOne({ MemberId: _id }, (err) => {
    if (err) return err;
  });

  await membersBL.deleteMember(_id);
  return "OK";
};
