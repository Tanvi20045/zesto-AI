const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        product:  { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name:     String,
        image:    String,
        price:    Number,
        qty:      Number,
      },
    ],

    address: {
      line1:   { type: String, required: true },
      city:    { type: String, required: true },
      pincode: { type: String, required: true },
      phone:   { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["upi", "card", "cod"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["placed", "confirmed", "packed", "out_for_delivery", "delivered", "cancelled"],
      default: "placed",
    },

    totalAmount:   { type: Number, required: true },
    deliveryFee:   { type: Number, default: 0 },
    platformFee:   { type: Number, default: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
