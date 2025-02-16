const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A experience must have a title"],
  },
  startyear: {
    type: Date,
    default: Date.now(),
  },
  endyear: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    required: [true, "A experience must have a title"],
  },
  techStack: {
    type: [String],
  },
  description: {
    type: String,
  },
  longDescription: String,
  points: [String],
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
