import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import express, { Router, Request, Response } from "express";

const router = express.Router();

const jwtSecretKey = process.env.JWT_SECRET_KEY || "your_secret_key";

function generateJWT(userId: string): string {
  return jwt.sign({ userId }, jwtSecretKey, { expiresIn: "7d" });
}

// Signup Route
router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check required fields
    if (!username || !email || !password) {
    res.status(400).json({ error: "Username, email, and password are required." });
    }

    // Check if account already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        res.status(400).json({ message: "An account already exists with this email address." });
      }
      if (existingUser.username === username) {
        res.status(400).json({ message: "This username is already taken." });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword
    });

    // Save new user to DB
    await newUser.save();

    res.status(201).json({
      message: "Registration successful.",
      user: { id: newUser._id, email: newUser.email, username: newUser.username }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Signin Route
router.post("/signin", async (req: Request, res: Response): Promise<void> => {
  const { email, username, password } = req.body;

  // Ensure either email or username is provided
  if (!email && !username) {
    res.status(400).json({
      message: "Please provide either an email or a username to sign in."
    });
  }

  try {
    // Find user by email or username
    const user = await UserModel.findOne({
      $or: [{ email }, { username }]
    });

    if (!user) {
    res.status(401).json({
        message: "Invalid email/username or password."
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    res.status(401).json({
        message: "Invalid email/username or password."
      });
    }

    // Generate token
    const token = generateJWT(user.id);

    res.status(200).json({
      message: "Sign in successful.",
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred during the sign-in process. Please try again."
    });
  }
});

export default router;
