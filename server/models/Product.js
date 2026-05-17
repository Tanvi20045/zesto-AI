const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    category: { type: String, required: true },
    price:    { type: Number, required: true },
    mrp:      { type: Number, required: true },
    qty:      { type: String, required: true },   // e.g. "500 ml", "1 kg"
    image:    { type: String, required: true },
    rating:   { type: Number, default: 4.5 },
    stock:    { type: Number, default: 100 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
