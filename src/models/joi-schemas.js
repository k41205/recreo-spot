import Joi from "joi";

export const UserSpec = Joi.object({
  firstName: Joi.string().required().min(2).max(30),
  lastName: Joi.string().required().min(2).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const UserCredentialsSpec = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
