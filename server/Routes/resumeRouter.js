const express = require("express");
const resumeController = require("../controllers/resumeController");

const Router = express.Router();

Router.route("/").get(resumeController.getResumePath);

module.exports = Router;
