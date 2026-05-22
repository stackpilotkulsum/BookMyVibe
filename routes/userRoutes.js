const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Booking = require("../models/Booking");

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({
        success: false,
        message: "Email already registered"
      });
    }

    const user = new User({
      name,
      email,
      password,
      role: "user"
    });

    await user.save();

    res.json({
      success: true,
      message: "User Registered Successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: err.message
    });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      token: "demo-token",
      role: user.role || "user"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message
    });
  }
});

// ADMIN: GET ALL BOOKINGS
router.get("/allbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings); // ⚠️ return array directly (your React expects this)
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch all bookings"
    });
  }
});

module.exports = router;
