"user strict";

const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .regex(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  password: Joi.string().required(),
  photo: Joi.string().uri()
});

module.exports = createUserSchema;
