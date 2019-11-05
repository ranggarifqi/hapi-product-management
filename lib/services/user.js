"use strict";

const Schmervice = require("schmervice");
const bcrypt = require("bcryptjs");
const Boom = require('@hapi/boom');

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

  async login({ email, password }) {
    try {
      const { Users } = this.server.models();
      const user = await Users.query().throwIfNotFound().first().where('email', email);
      
      // Compare password nya
      const isPwdValid = bcrypt.compareSync(password, user.password);
      
      if (!isPwdValid) {
        throw new Error('');
      }

      // Construct JWT

      return 'asd';
    } catch (error) {
      return Boom.unauthorized('Mohon cek email / password anda'); 
    }
  }
};
