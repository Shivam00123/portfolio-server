const express = require("express");
const companyProjectsController = require("../controllers/companyProjectsController");

const Router = express.Router();

Router.route("/").get(companyProjectsController.getAllCompanyProjects);
Router.route("/:id").get(companyProjectsController.getCompanyProjectInfo);

module.exports = Router;
