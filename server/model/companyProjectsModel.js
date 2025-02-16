const mongoose = require("mongoose");

const companyProjectsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A experience must have a title"],
  },
  image: {
    type: String,
  },
  techStack: {
    type: [String],
  },
  description: {
    type: String,
  },
  longDescription: String,
  points: [String],
  likes: Number,
});

const CompanyProjects = mongoose.model(
  "CompanyProjects",
  companyProjectsSchema
);

module.exports = CompanyProjects;
