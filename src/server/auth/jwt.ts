import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../env";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const signToken = (payload: { id: string; email: string; role: string }): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as { id: string; email: string; role: string };
  } catch {
    return null;
  }
};
