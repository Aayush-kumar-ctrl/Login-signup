const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // ✅ Email validation
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format ❌" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword
  });

  await user.save();

  res.json({ message: "Signup successful ✅" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // ✅ Email validation
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format ❌" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found ❌" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password ❌" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      username: user.username,
      email: user.email
    }
  });
});

module.exports = router;