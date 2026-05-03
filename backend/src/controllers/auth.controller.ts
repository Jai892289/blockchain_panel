import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.models";
import { generateToken } from "../utils/jwt";

/* REGISTER */
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    provider: "local",
  });

  res.json({ message: "Registered", user });
};

/* LOGIN */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.password) {
    return res.status(400).json({
      message: "Use Google login for this account",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({ token });
};

/* GOOGLE SUCCESS */
export const googleSuccess = (req: any, res: Response) => {
  const token = generateToken(req.user);

  res.redirect(`http://localhost:3000/login-success?token=${token}`);
};