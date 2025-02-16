const CompanyProjects = require("../model/companyProjectsModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllCompanyProjects = catchAsync(async (req, res, next) => {
  const companyProjects = await CompanyProjects.find();
  res.status(200).send({
    status: "success",
    data: companyProjects,
  });
});

exports.getCompanyProjectInfo = catchAsync(async (req, res, next) => {
  const project = await CompanyProjects.findById(req.params.id);
  res.status(200).send({
    status: "success",
    data: project,
  });
});
