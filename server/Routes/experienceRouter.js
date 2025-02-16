const express = require("express");
const experienceController = require("../controllers/experienceController");

const Router = express.Router();

Router.route("/").get(experienceController.getAllExperience);

module.exports = Router;
