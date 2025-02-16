const jsonwebtoken = require("jsonwebtoken");
const util = require("util");
const User = require("../model/userModel");
const ErrorHandler = require("./errorHandler");

class JSONWebToken {
  constructor(id) {
    this.id = id;
    this.token = "";
    this.jwtSecret = process.env.JWT_SECRET;
    this.expires_in = process.env.EXPIRES_In;
  }

  cookieOptionsControl(req) {
    const expiresInMilliseconds = this.cookieExpiresIn * 24 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + expiresInMilliseconds);

    const cookieOptions = {
      expiresIn: expirationDate.toUTCString(),
      httpOnly: true,
      domain: "localhost", // Set domain
      path: "/", // Set path
      // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    };

    return cookieOptions;
  }

  async signToken(users, statusCode, req, res, verified = true) {
    this.token = await jsonwebtoken.sign({ id: this.id }, this.jwtSecret, {
      expiresIn: this.expires_in,
    });

    res.cookie("jwt", this.token, this.cookieOptionsControl(req));
    users.OTP = undefined;
    users.password = undefined;
    users.verified = undefined;
    users.otpExpiration = undefined;
    users.__v = undefined;

    res.status(statusCode).json({
      status: "success",
      token: this.token,
      ...(!verified && { state: "pending" }),
      data: {
        users,
      },
    });
  }
  async verifyToken(req, res, next) {
    this.token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      this.token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      this.token = req.cookies.jwt;
    }
    if (!this.token) {
      return next(
        new ErrorHandler("Unauthorize, Please login to continue.", 401)
      );
    }

    const verification = await util.promisify(jsonwebtoken.verify)(
      this.token,
      this.jwtSecret
    );
    if (!verification) {
      return next(
        new ErrorHandler("Unauthorize, Please login to continue.", 401)
      );
    }

    const freshUser = await User.findById(verification.id).select("+verified");

    if (!freshUser || !freshUser?.verified) {
      return next(
        new ErrorHandler("Unauthorize, Please login to continue.", 401)
      );
    }
    req.user = freshUser;
    next();
  }
}

module.exports = JSONWebToken;
