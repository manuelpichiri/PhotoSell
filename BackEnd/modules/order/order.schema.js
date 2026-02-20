const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "photo",
        required: true,
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "refunded"],
      default: "pending",
    },
    delivery: {
      type: String,
      enum: ["digital", "physical"],
      default: "digital",
    },
  },
  { timestamps: true, strict: true },
);

module.exports = mongoose.model("order", orderSchema, "orders");
