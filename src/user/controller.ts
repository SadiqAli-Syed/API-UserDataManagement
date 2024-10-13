import { Request, Response } from 'express';
import { createUser, findUserByUsername } from './services';
import { generateToken } from '../auth/JWT';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      res.status(400).json({ error: 'Username already taken' });
      return;
    }

    const newUser = await createUser({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(400).json({ error: 'User DoesNot Exist' });
      return;
    }
    var hashedPass = user.password; 
    const isMatch = await bcrypt.compare(password, hashedPass);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }
    const token = generateToken(user.username);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, newpass } = req.body;
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(400).json({ error: 'User Does Not Exist' });
      return;
    }
    var hashedPass = user.password;
    const isMatch = await bcrypt.compare(password, hashedPass);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }
    user.password = newpass;
    await user.save();
    res.json({ message: 'Password changed' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password} = req.body;
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }
    var hashedPass = user.password;
    const isMatch = await bcrypt.compare(password, hashedPass);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }
    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { username } = req.body;
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(400).json({ error: 'User DoesNot Exist' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
}
