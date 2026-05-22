const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists");

    const user = new User({ name, email, password });
    await user.save();

    res.redirect("/login.html");
  } catch (err) {
    console.log(err);
    res.send("Registration error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) return res.send("Invalid credentials");

    res.redirect("/dashboard.html");
  } catch (err) {
    console.log(err);
    res.send("Login error");
  }
});

module.exports = router;
