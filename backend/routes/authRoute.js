import express from "express";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Sign up a new user with email, password, and name
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
      password: password,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
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
 * @route   PUT, POST, PATCH /api/auth/preferences, /api/preferences, /api/auth/niches
 * @desc    Save user preferences (selected niches & language) in User document
 */
const handleUpdatePreferences = async (req, res) => {
  try {
    const { userId, id, _id, email, niches, language } = req.body || {};
    const targetId = req.params?.id || userId || id || _id;

    if (!targetId && !email) {
      return res.status(400).json({
        success: false,
        message: "User ID or email is required to update preferences",
      });
    }

    let user;
    if (targetId) {
      try {
        user = await User.findById(targetId);
      } catch {
        // Fallback to email search if targetId is not a valid ObjectId
      }
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
      message: "Preferences updated successfully!",
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
};

router.put("/preferences", handleUpdatePreferences);
router.post("/preferences", handleUpdatePreferences);

/**
 * @route   GET /api/auth/preferences
 * @desc    Fetch user preferences by email or userId
 */
router.get("/preferences", async (req, res) => {
  try {
    const { email, userId, id } = req.query;
    const targetId = userId || id;

    let user;
    if (targetId) {
      try {
        user = await User.findById(targetId);
      } catch {
        // Fallback
      }
    }
    if (!user && email) {
      user = await User.findOne({ email: email.trim().toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        niches: user.niches || [],
        language: user.language || "en",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch preferences",
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

/**
 * @route   GET /api/auth/bookmarks
 * @desc    Get all bookmarks for a user
 */
router.get("/bookmarks", async (req, res) => {
  try {
    const { email, userId, id } = req.query;
    const targetId = userId || id;

    let user;
    if (targetId) {
      try { user = await User.findById(targetId); } catch {}
    }
    if (!user && email) {
      user = await User.findOne({ email: email.trim().toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Return bookmarks sorted newest first
    const sorted = [...(user.bookmarks || [])].sort(
      (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
    );

    return res.status(200).json({ success: true, bookmarks: sorted });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch bookmarks", error: error.message });
  }
});

/**
 * @route   POST /api/auth/bookmarks/toggle
 * @desc    Toggle bookmark for a story (save if not saved, remove if already saved)
 * @body    { userId|email, story: { id, title, snippet, category, ... } }
 */
router.post("/bookmarks/toggle", async (req, res) => {
  try {
    const { userId, id: bodyId, email, story } = req.body;
    const targetId = req.params?.id || userId || bodyId;

    if (!story || !story.id) {
      return res.status(400).json({ success: false, message: "Story object with id is required" });
    }

    let user;
    if (targetId) {
      try { user = await User.findById(targetId); } catch {}
    }
    if (!user && email) {
      user = await User.findOne({ email: email.trim().toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const alreadySaved = user.bookmarks.some((b) => b.id === story.id);

    if (alreadySaved) {
      // Remove bookmark
      user.bookmarks = user.bookmarks.filter((b) => b.id !== story.id);
    } else {
      // Add bookmark with full story data
      user.bookmarks.push({
        id: story.id,
        title: story.title,
        snippet: story.snippet,
        category: story.category,
        categoryBg: story.categoryBg || '',
        categoryText: story.categoryText || '',
        source: story.source,
        sourceUrl: story.sourceUrl || '',
        listenTime: story.listenTime || '3 MIN LISTEN',
        durationMinutes: story.durationMinutes || '3 MIN',
        nicheId: story.nicheId || '',
        savedAt: new Date(),
      });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      action: alreadySaved ? 'removed' : 'added',
      bookmarks: [...user.bookmarks].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)),
    });
  } catch (error) {
    console.error("Bookmark Toggle Error:", error);
    return res.status(500).json({ success: false, message: "Failed to toggle bookmark", error: error.message });
  }
});

/**
 * @route   DELETE /api/auth/bookmarks/:storyId
 * @desc    Remove a specific bookmark by story ID
 * @query   userId or email required
 */
router.delete("/bookmarks/:storyId", async (req, res) => {
  try {
    const { storyId } = req.params;
    const { userId, email } = req.query;

    let user;
    if (userId) {
      try { user = await User.findById(userId); } catch {}
    }
    if (!user && email) {
      user = await User.findOne({ email: email.trim().toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.bookmarks = user.bookmarks.filter((b) => b.id !== storyId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Bookmark removed",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to remove bookmark", error: error.message });
  }
});

export default router;

