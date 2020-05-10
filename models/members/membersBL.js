const membersDAL = require("../../DAL/membersDAL");
const MembersModel = require("../members/membersModel");

exports.reset = async () => {
  let { data } = await membersDAL.getMembersWebService();

  await MembersModel.deleteMany();

  let members = data.map((member) => {
    return new MembersModel({
      Name: member.name,
      Email: member.email,
      City: member.address.city,
    });
  });

  MembersModel.insertMany(members);
};
