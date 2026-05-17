const express = require("express");
const jwt     = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User    = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Helper to generate JWT
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// POST /api/auth/register
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Min 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { name, email, password } = req.body;

      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: "Email already registered" });

      const user  = await User.create({ name, email, password });
      const token = generateToken(user._id);

      res.status(201).json({
        token,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = generateToken(user._id);
      res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// GET /api/auth/me  — get logged in user
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
