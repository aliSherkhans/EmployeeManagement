const salaryModel = require("../Database/model/salarySchema");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

//Create Salary
exports.addSalary = asyncErrorHandler(async (req, resp, next) => {
  const salaryDetail = req.body;
  const addSalary = await salaryModel.create(salaryDetail);

  resp.status(201).json({
    status: "Success",
    message: "Add salary",
    addSalary,
  });
});

//Get All Salary
exports.getAllSalary = asyncErrorHandler(async (req, resp, next) => {
  const allPaySalray = await salaryModel.find();
  if (allPaySalray.length <= 0) {
    const error = new CustomError("Salary not found", 404);
    return next(error);
  }

  resp.status(200).json({
    status: "Success",
    allPaySalray,
  });
});

//Get Salary By Id
exports.getSalaryById = asyncErrorHandler(async (req, resp, next) => {
  const paySalary = await salaryModel.find({ empId: req.params.empId });

  if (paySalary.length <= 0) {
    const error = new CustomError(
      "You did not pay the salary this employer",
      404
    );
    return next(error);
  }

  resp.status(200).json({
    status: "Success",
    paySalary,
  });
});

//Update Sslary By Id 
exports.updateSalary = asyncErrorHandler(async (req, resp, next) => {
  let paySalary = await salaryModel.findById(req.params.id);
  if (!paySalary) {
    const error = new CustomError("Salary not found", 404);
    return next(error);
  }

  paySalary = await salaryModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  resp.status(200).json({
    status: "Success",
    message: "Update salary",
    updateSalary: paySalary,
  });
});

//Delete Salary By Id
exports.deleteSalary = asyncErrorHandler(async (req, resp, next) => {
  const paySalary = await salaryModel.findById(req.params.id);
  if (!paySalary) {
    const error = new CustomError("Salary not found", 404);
    return next(error);
  }
  await salaryModel.findByIdAndDelete(req.params.id);

  resp.status(200).json({
    status: "Success",
    message: "Delete salary",
  });
});
