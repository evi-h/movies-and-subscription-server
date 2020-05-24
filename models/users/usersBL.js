const usersDAL = require("../../DAL/usersDAL");
const UsersModel = require("../users/usersModel");
const jsonfile = require("jsonfile");

exports.reset = async () => {
  await UsersModel.deleteMany({ username: { $ne: "admin" } });
  // jsonfile.writeFile("data/users.json", { users: [] });
  // jsonfile.writeFile("data/permissions.json", { permissions: [] });
};

const getAllUsers = (exports.getAllUsers = async () => {
  return await usersDAL.getAllUsers();
});

const getPermissions = (exports.getPermissions = async () => {
  return await usersDAL.getPermissions();
});

exports.getAllUsersWithPermmissions = async () => {
  let { users } = await getAllUsers();
  let { permissions } = await getPermissions();

  users = users.map((user) => {
    user.permissions = permissions
      .filter((per) => per._id === user._id)
      .map((per) => per.permissions)[0];
    return user;
  });
  return users;
};

exports.getUserByUsername = async (username) => {
  return await usersDAL.getUserByUsername(username);
};

exports.getUserById = async (id) => {
  let { users } = await usersDAL.getAllUsers();
  return users.filter((user) => user._id === id);
};

const addNewUserFiles = async (user, id) => {
  let { users } = await getAllUsers();
  user._id = id;
  let { permissions, ...rest } = user;
  users.push(rest);
  jsonfile.writeFile("data/users.json", { users });

  let userPermission = { _id: user._id, permissions };
  let permissionsData = await getPermissions();
  permissionsData.permissions.push(userPermission);
  jsonfile.writeFile("data/permissions.json", permissionsData);
};

exports.addNewUser = async (user) => {
  let userModel = new UsersModel({
    Username: user.username,
    Password: "",
  });

  await userModel.save(async (err, newUser) => {
    if (err) throw err;
    addNewUserFiles(user, newUser._id);
  });
  return "OK";
};

exports.updateUser = async (userUpdate) => {
  try {
    let { users } = await getAllUsers();
    let { permissions, ...rest } = userUpdate;
    users = users.filter((user) => user._id != userUpdate._id);
    users.push(rest);
    jsonfile.writeFile("data/users.json", { users });

    let userPermission = { _id: userUpdate._id, permissions };
    let permissionsData = await getPermissions();
    permissionsData.permissions = permissionsData.permissions.filter(
      (permission) => permission._id != userUpdate._id
    );
    permissionsData.permissions.push(userPermission);
    jsonfile.writeFile("data/permissions.json", permissionsData);

    return "OK";
  } catch (err) {
    return err;
  }
};

const deleteUserFromFiles = async (_id) => {
  let { users } = await getAllUsers();

  users = users.filter((user) => user._id != _id);
  jsonfile.writeFile("data/users.json", { users });

  let permissionsData = await getPermissions();
  permissionsData.permissions = permissionsData.permissions.filter(
    (permission) => permission._id != _id
  );
  jsonfile.writeFile("data/permissions.json", permissionsData);
};

exports.deleteUser = async (_id) => {
  await UsersModel.deleteOne({ _id }, async (err) => {
    deleteUserFromFiles(_id);
    if (err) return err;
  });
  return "OK";
};
