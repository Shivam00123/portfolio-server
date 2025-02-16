const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Email = require("../utils/email");
const generateOTP = require("../utils/generateOTP");

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a Username!"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: true,
    validate: [validator.isEmail, "Invalid Email Format."],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    select: false,
    validate: {
      validator: function (value) {
        return passwordRegex.test(value);
      },
      message:
        "One capital letter, One lowercase letter, One number, and One special character.",
    },
  },
  verified: {
    type: Boolean,
    default: false,
    select: false,
  },
  OTP: {
    type: String,
    default: "",
    select: false,
  },
  otpExpiration: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.password) {
    return next();
  }
  const hashed_password = await bcrypt.hash(this.password, 12);
  if (!this.isModified("password")) return next();
  this.password = hashed_password;
  next();
});

UserSchema.methods.correctPasswords = async (candidatePassword, password) => {
  let result = await bcrypt.compare(candidatePassword, password);
  return result;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
