const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com"
];

// similarity check
const similarity = (a, b) => {
  let match = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) match++;
  }
  return match / Math.max(a.length, b.length);
};

// email validator + suggestion
const checkEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return { valid: false };

  const domain = email.split("@")[1];

  const suggestion = validDomains.find(d => similarity(domain, d) > 0.7);

  if (!validDomains.includes(domain)) {
    return { valid: false, suggestion };
  }

  return { valid: true };
};

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const check = checkEmail(email);

  if (!check.valid) {
    return res.status(400).json({
      message: check.suggestion
        ? `Did you mean ${check.suggestion}?`
        : "Invalid email"
    });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashed
  });

  await user.save();

  res.json({ message: "Signup successful" });
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const check = checkEmail(email);

  if (!check.valid) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id },
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