import { Algorithm } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { db } from "../models/db.js";
import { User } from "user-firestore-store.js";

export function createToken(user: User) {
  const payload = {
    id: user.id,
  };
  const options: { algorithm: Algorithm; expiresIn: string } = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  if (!process.env.COOKIE_PASSWORD) {
    throw new Error("COOKIE_PASSWORD environment variable is not set");
  }
  return jwt.sign(payload, process.env.COOKIE_PASSWORD, options);
}

export function decodeToken(token: any) {
  const userInfo = {};

  //@ts-ignore
  const decoded = jwt.verify(token, process.env.COOKIE_PASSWORD);
  (userInfo as any).userId = decoded.id;

  return userInfo;
}

export async function validate(decoded: any, request: any) {
  const user = await db.userStore!.getUserById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user.id };
}
