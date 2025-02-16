const express = require("express");
const authController = require("../controllers/authController");

const Router = express.Router();

Router.route("/create").post(authController.createUser);
Router.route("/verifyOTP").post(authController.verifyOTP);
Router.route("/isLoggedIn").get(authController.isLoggedIn);
Router.route("/login").post(authController.signIn);

module.exports = Router;
