import Joi from "joi";

const username = Joi.string().max(10).example("HomSims");
const firstName = Joi.string().example("Homer");
const lastName = Joi.string().example("Simpson");
const email = Joi.string().email().example("homer@simpson.com");
const password = Joi.string().min(6).example("secret");
const type = Joi.string().valid("user", "mod", "admin");

export const UserIdSpec = Joi.string().required().example("EriU0nvx7ha1W4yGtflZ").label("User Id");

export const UserCredentialsPayload = Joi.object()
  .keys({
    email: email.required(),
    password: password.required(),
  })
  .label("UserLogin");

export const UserCreatePayload = UserCredentialsPayload.keys({
  username: username.required(),
  firstName: firstName.required(),
  lastName: lastName.required(),
}).label("UserSignup");

export const UserUpdatePayload = Joi.object()
  .keys({
    firstName,
    lastName,
    type,
    email,
    password,
  })
  .label("UserUpdate");

export const UserSchema = UserCreatePayload.keys({
  type: type.required(),
  id: UserIdSpec.required(),
  favorites: Joi.array().items(Joi.string()).label("Favorite POIs"),
}).label("UserObject");

export const UserArray = Joi.array().items(UserSchema).label("UserArray");

const lat = Joi.string().example("53.3498");
const lon = Joi.string().example("-6.2618");
const name = Joi.string().example("Back Page Pub");
const description = Joi.string().example("It's a very nice pub with some pool tables and arcades!");
const author = Joi.string().example("EriU0nvx7ha1W4yGtflZ");
const isPublic = Joi.boolean();
const isCandidate = Joi.boolean();

export const PoiIdSpec = Joi.string().example("EriU0nvx7ha1W4yGtflZ").label("Poi Id");

export const PoiCreatePayload = Joi.object()
  .keys({
    lat: lat.required(),
    lon: lon.required(),
    name: name.required(),
    description: description.required(),
  })
  .label("PoiUpdate");

export const PoiCreateSpec = PoiCreatePayload.keys({
  author: author.required(),
  isPublic: isPublic.required(),
  isCandidate: isCandidate.required(),
}).label("PoiCreate");

export const PoiSchema = PoiCreatePayload.keys({
  id: PoiIdSpec.required(),
  author: author.required(),
  isPublic: isPublic.required(),
  isCandidate: isCandidate.required(),
}).label("PoiObject");

export const PoiArray = Joi.array().items(PoiSchema).label("PoiArray");
