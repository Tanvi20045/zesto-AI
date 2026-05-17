const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes    = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes   = require("./routes/orders");

const app = express();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders",   orderRoutes);

// Health check
app.get("/", (req, res) => res.json({ message: "Zesto API running ✅" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Connect to real MongoDB Atlas and start server
async function startServer() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected ✅");

  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000} ✅`)
  );
}

startServer();