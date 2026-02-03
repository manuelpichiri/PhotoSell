const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      min: 1,
      max: 200,
      required: true,
    },
    titile: {
      type: String,
      min: 1,
      max: 200,
      required: true,
    },
    description: {
      type: String,
      min: 1,
      required: false,
    },
    createdAt: {
      type: Date,
      required: false,
      default: Date.now,
    },
    price: {
      type: Double,
      required: false,
      default: 0.0,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, strict: true },
);
module.exports = mongoose.model("photo", photo, "photos");
