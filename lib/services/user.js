"use strict";

const Schmervice = require("schmervice");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

module.exports = class UserService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async register({ email, password, fullName }) {
    const { Users } = this.server.models();
    // Hash Password dulu
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {
      email,
      password: hashedPassword,
      fullName
    };
    return await Users.query().insertAndFetch(newUser);
  }
};
