const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 1,
      max: 100,
      required: true,
    },
    lastName: {
      type: String,
      min: 1,
      max: 100,
      required: true,
    },
    email: {
      type: String,
      min: 1,
      max: 100,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 8,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
      required: false,
    },
    dateOfBirth: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["admin", "user", "company"],
      default: user,
    },
    country: {
      type: String,
      default: "",
      required: false,
    },
    isCompany: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    photo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "photo",
        default: [],
      },
    ],
  },
  { timestamps: true, strict: true },
);

module.exports = mongoose.model("user", user, "users");
