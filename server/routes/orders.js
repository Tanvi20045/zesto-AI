const express = require("express");
const Order   = require("../models/Order");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// POST /api/orders — place order (logged in user)
router.post("/", protect, async (req, res) => {
  try {
    const { items, address, paymentMethod, totalAmount, deliveryFee, platformFee } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      address,
      paymentMethod,
      totalAmount,
      deliveryFee:  deliveryFee  || 0,
      platformFee:  platformFee  || 5,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/orders/my — logged in user's orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/orders/:id — single order
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // User can only see their own order; admin can see all
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/orders — admin: all orders
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/orders/:id/status — admin update status
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
