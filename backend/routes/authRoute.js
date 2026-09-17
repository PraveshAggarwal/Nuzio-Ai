import express from "express";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Sign up a new user with email, password, and name (saved directly as-is in MongoDB)
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists. Please log in.",
      });
    }

    const displayName = name?.trim() || cleanEmail.split("@")[0];

    const newUser = await User.create({
      name: displayName,
      email: cleanEmail,
      password: password, // Saved as-is in database
    });

    return res.status(201).json({
      success: true,
      message: "Account created and saved in database!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        niches: newUser.niches || [],
        language: newUser.language || 'en',
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create account",
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Log in with email and password
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email. Please sign up first.",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please check your credentials.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        niches: user.niches || [],
        language: user.language || 'en',
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

/**
 * @route   PUT /api/auth/preferences
 * @desc    Save user preferences (selected niches & language) in MongoDB User document
 */
router.put("/preferences", async (req, res) => {
  try {
    const { userId, email, niches, language } = req.body;

    if (!userId && !email) {
      return res.status(400).json({
        success: false,
        message: "User ID or email is required to update preferences",
      });
    }

    let user;
    if (userId) {
      user = await User.findById(userId);
    }
    if (!user && email) {
      user = await User.findOne({ email: email.trim().toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in database",
      });
    }

    if (Array.isArray(niches)) {
      user.niches = niches;
    }
    if (language) {
      user.language = language;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Preferences updated and saved in database!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        niches: user.niches,
        language: user.language,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update Preferences Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update preferences",
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/auth/users
 * @desc    Get all users in database
 */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

export default router;
