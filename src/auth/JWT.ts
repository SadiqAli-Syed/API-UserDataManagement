import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || '123456';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
