const express = require("express");
const personalProjectsController = require("../controllers/personalProjectsController");

const Router = express.Router();

Router.route("/").get(personalProjectsController.getAllPersonalProjects);
Router.route("/:id").get(personalProjectsController.getPersonalProjectInfo);

module.exports = Router;
