// src/auth/jwtValidator.ts

import { Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Function to validate JWT and return decoded user info or false
export const authenticateJWT = (req: Request): String| boolean | Record<string, any> => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Extract the token

    try {
      // Verify and decode the token
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
      return decodedUser; // Return the decoded user information
    } catch (error) {
      console.error('JWT verification failed:', error);
      return false; // Return false if the token is invalid
    }
  }

  return false; // Return false if no valid auth header
};
