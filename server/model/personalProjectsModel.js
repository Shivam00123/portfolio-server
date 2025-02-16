const mongoose = require("mongoose");

const personalProjectsSchema = new mongoose.Schema({
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
  link: String,
});

const PersonalProjects = mongoose.model(
  "PersonalProjects",
  personalProjectsSchema
);

module.exports = PersonalProjects;
