const { INITIAL_USERS_LENGTH } = require("../constants");
const { faker, createRandomUser } = require("../helpers/faker");

class UserModel {
  _list = [];

  seed() {
    Array.from({ length: INITIAL_USERS_LENGTH }).forEach(() => {
      this._list.push(createRandomUser());
    });
  }

  getList() {
    return this._list;
  }

  getUser(uid) {
    return this._list.find((user) => user.id === uid) || null;
  }

  addUser(user) {
    const newUser = {
      id: faker.datatype.number(),
      ...user,
      avatar: faker.image.avatar(),
    };
    this._list.unshift(newUser);
    return {
      status: "success",
      user: newUser,
    };
  }

  editUser(user) {
    const foundUser = this.getUser(user.id);
    if (foundUser) {
      this._list = this._list.map((listItem) =>
        listItem.id === user.id ? { ...foundUser, ...user } : listItem
      );
      return "success";
    }
    return "failed";
  }

  findUserIndex(uid) {
    return this._list.findIndex((user) => user.id === uid);
  }
  findAndRemoveUser(uid) {
    const index = this.findUserIndex(uid);
    if (index !== -1) {
      this._list.splice(index, 1);
      return "success";
    }
    return "failed";
  }
}
const Users = new UserModel();
module.exports = Users;
