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

exports.getUserByUsername = async (username) => {
  return await usersDAL.getUserByUsername(username);
};

exports.getUserById = async (id) => {
  let { users } = await usersDAL.getAllUsers();
  return users.filter((user) => user.id === id);
};

exports.addNewUser = async (user) => {
  try {
    let userModel = new UsersModel({
      Username: user.username,
    });

    await userModel.save(async (err, newUser) => {
      if (err) throw err;

      let { users } = await getAllUsers();
      user.id = newUser.id;
      let { permissions, ...rest } = user;
      users.push(rest);
      jsonfile.writeFile("data/users.json", { users });

      let userPermission = { id: user.id, permissions };
      let permissionsData = await getPermissions();
      permissionsData.permissions.push(userPermission);
      jsonfile.writeFile("data/permissions.json", permissionsData);

      return "OK";
    });
  } catch (err) {
    return err;
  }
};

exports.updateUser = async (userUpdate) => {
  try {
    let { users } = await getAllUsers();
    let { permissions, ...rest } = userUpdate;
    users = users.filter((user) => user.id != userUpdate.id);
    users.push(rest);
    jsonfile.writeFile("data/users.json", { users });

    let userPermission = { id: userUpdate.id, permissions };
    let permissionsData = await getPermissions();
    permissionsData.permissions = permissionsData.permissions.filter(
      (permission) => permission.id != userUpdate.id
    );
    permissionsData.permissions.push(userPermission);
    jsonfile.writeFile("data/permissions.json", permissionsData);

    return "OK";
  } catch (err) {
    return err;
  }
};

exports.deleteUser = async (_id) => {
  try {
    await UsersModel.deleteOne({ _id }, async (err) => {
      if (err) throw err;

      let { users } = await getAllUsers();

      users = users.filter((user) => user.id != _id);
      jsonfile.writeFile("data/users.json", { users });

      let permissionsData = await getPermissions();
      permissionsData.permissions = permissionsData.permissions.filter(
        (permission) => permission.id != _id
      );
      jsonfile.writeFile("data/permissions.json", permissionsData);

      return "OK";
    });
  } catch (err) {
    return err;
  }
};
