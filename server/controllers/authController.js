const User = require("../model/userModel");
const JSONWebToken = require("../utils/JsonWebToken");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorHandler");
const generateOTP = require("../utils/generateOTP");

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  const doc = await generateOTP(user);
  await doc.save({ validateBeforeSave: true });
  await new JSONWebToken(user._id).signToken(user, 201, req, res);
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { OTP } = req.body;
  const encrypted_OTP = crypto.createHash("sha256").update(OTP).digest("hex");
  const user = await User.findOne({
    OTP: encrypted_OTP,
    otpExpiration: { $gt: Date.now() },
  }).select("+verified");
  if (!user) {
    res.status(404).json({
      status: "failed",
      msg: "OTP is either invalid or expired!",
    });
    return;
  }
  user.verified = true;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }
  const user = await User.findOne({ email })
    .select("+password")
    .select("+verified");
  if (!user) {
    return next(new ErrorHandler("User not found! Please Register", 404));
  }
  const checkPassword = await user.correctPasswords(password, user.password);
  if (!checkPassword) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }
  if (!user.verified) {
    const doc = await generateOTP(user);
    await doc.save({ validateBeforeSave: true });
    await new JSONWebToken(user._id).signToken(user, 200, req, res, false);
    return;
  }
  await new JSONWebToken(user._id).signToken(user, 200, req, res);
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  await new JSONWebToken().verifyToken(req, res, next);
  let user = req.user;
  if (user) {
    res.status(200).json({
      status: user ? "success" : "failed",
      data: user,
    });
  }
  return;
});
