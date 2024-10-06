import { User } from "../models/User.js"; // Adjust path as necessary
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // For JWT token generation

// Signup controller
export const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      message: "Provide both email and password",
    });
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({
      email,
      password: password, // Password is not required for Google OAuth
    });

    // Save the user
    user = await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      message: "Provide both email and password",
    });

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if user is using Google OAuth (password should be null)
    if (user.googleId) {
      return res.status(400).json({ message: "Please use Google to log in" });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token (if using token-based authentication)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Login controller for google oauth
export const loginWithGoogleAuthId = async (req, res) => {
  const { email, googleId } = req.body;
  if (!email || !googleId)
    return res.status(400).json({
      message: "Provide both email and googleId",
    });

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user is using Google OAuth (password should be null)
    if (user && user?.googleId) {
      // Generate a JWT token (if using token-based authentication)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({ message: "Login successful", token });
    }

    const newUser = new User({
      email,
      googleId,
    });

    // Save the user
    await newUser.save();

    // Generate a JWT token (if using token-based authentication)
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
