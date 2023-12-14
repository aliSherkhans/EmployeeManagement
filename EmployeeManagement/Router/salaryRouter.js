const express = require("express");
const salaryController = require("../Controller/salaryController");
const { authVerify } = require("../Controller/authVerification");

const Router = express.Router();

//Create Salary
Router.route("/add").post(authVerify, salaryController.addSalary);

//Get All Salary
Router.route("/get").get(authVerify, salaryController.getAllSalary);

//Get Salary By Id
Router.route("/get/:empId").get(authVerify, salaryController.getSalaryById);

//Update Sslary By Id
Router.route("/update/:id").put(authVerify, salaryController.updateSalary);


//Delete Salary By Id
Router.route("/delete/:id").delete(authVerify, salaryController.deleteSalary);

module.exports = Router;
