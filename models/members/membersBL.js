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

exports.getAllMembers = async () => await membersDAL.getAllMembers();

exports.getMemberById = async (id) => await membersDAL.getMemberById(id);

exports.addNewMember = async (member) => {
  let newMember = new MembersModel(member);

  await newMember.save((err) => {
    if (err) return err;
  });
  return "OK";
};

exports.updateMember = async (member) => {
  await MembersModel.updateOne({ _id: member._id }, member, (err) => {
    if (err) return err;
  });
  return "OK";
};

exports.deleteMember = async (_id) => {
  await MembersModel.deleteOne({ _id }, (err) => {
    if (err) return err;
  });
  return "OK";
};
