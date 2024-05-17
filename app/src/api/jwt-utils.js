import jwt from "jsonwebtoken";
import { db } from "../models/db.js";

export function createToken(user) {
  const payload = {
    id: user.id,
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.COOKIE_PASSWORD, options);
}

export function decodeToken(token) {
  const userInfo = {};

  const decoded = jwt.verify(token, process.env.COOKIE_PASSWORD);
  userInfo.userId = decoded.id;

  return userInfo;
}

export async function validate(decoded, request) {
  const user = await db.userStore.getUserById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user.id };
}
