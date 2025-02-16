const Resume = require("../model/resumeModel");
const catchAsync = require("../utils/catchAsync");

exports.getResumePath = catchAsync(async (req, res, next) => {
  const resumepath = await Resume.find();
  res.status(200).send({
    status: "success",
    data: resumepath,
  });
});
