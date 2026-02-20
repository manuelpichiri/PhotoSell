const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      min: 1,
      max: 200,
      required: true,
    },
    title: {
      type: String,
      minLength: 1,
      maxLength: 200,
      required: true,
    },
    description: {
      type: String,
      min: 1,
      required: false,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    ratingSum: {
      type: Number,
      default: 0,
      required: false,
    },
    ratingCount: {
      type: Number,
      default: 0,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, strict: true },
);
module.exports = mongoose.model("photo", photoSchema, "photos");
