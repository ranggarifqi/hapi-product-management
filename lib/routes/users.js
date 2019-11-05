"use strict";

const Joi = require('@hapi/joi');

module.exports = {
  method: "POST",
  path: "/users",
  options: {
    validate: {
      payload: {
        email: Joi.string().required(),
        password: Joi.string().required(),
        fullName: Joi.string().required()
      }
    },
    handler: async (request, h) => {
      const { Users } = request.models();
      const newUser = request.payload;
      return await Users.query().insertAndFetch(newUser);
    }
  }
};
