import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../env.js";
export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};
export const verifyPassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};
export const signToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
