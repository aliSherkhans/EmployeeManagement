const config = require("../config");
const CustomError = require("../utils/customError");

//Project Development Error Handler
const developmentErrors = (error, resp) => {
  console.log("Dev");
  resp.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error,
  });
};


const castErrorHamdler = (error) => {
  const msg = `Invalid value for ${error.path}: ${error.value}`;
  return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (error) => {
  if (error.keyValue.mobile) {
    const msg = `There is already a exists with mobile number ${error.keyValue.mobile}`;
    return new CustomError(msg, 400);
  } else if (error.keyValue.email) {
    const msg = `There is already a exists with email ${error.keyValue.email}`;
    return new CustomError(msg, 400);
  }
};

const ValidationErrorhandler = (error) => {
  const errors = Object.values(error.errors).map((val) => val.message);
  const errorMassage = errors.join(".");
  return new CustomError(errorMassage, 400);
};

//Project Production Error Handler
const productionError = (error, resp) => {
  if (error.isOperational) {
    console.log("production");
    resp.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    resp.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

//Global Error Handler
module.exports = function (error, req, resp, next) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (config.NODE_ENV === "production") {
    if (error.name === "CastError") error = castErrorHamdler(error);
    if (error.code === 11000) error = duplicateKeyErrorHandler(error);
    if (error.name === "ValidationError") error = ValidationErrorhandler(error);

    productionError(error, resp);
  } else if (config.NODE_ENV === "development") {
    developmentErrors(error, resp);
  }
};
