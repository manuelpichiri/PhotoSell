const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

      required: function () {
        return this.provider !== "google";
      },

      validate: {
        validator: function (value) {
          if (this.provider === "google") return true; // se l'utente arriva da google skip validazione password

          return passwordRegex.test(value);
        },
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      },
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
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
      default: "user",
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

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (this.provider === "google" && !this.password) return;

  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    if (!update) {
      return next();
    }
    const plainPassword = update.password ?? update.$set.password;
    if (!plainPassword) return next();

    const salt = await bcrypt.genSalt(15);
    const hashed = await bcrypt.hash(plainPassword, salt);
    if (update.password) {
      update.password = hashed;
    }
    if (update.$set.password) {
      update.$set.password = hashed;
    }
    this.setUpdate(update);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("user", userSchema, "users");
