const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  pathToPdf: {
    type: String,
    required: [true, "please provide a path to resume"],
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
