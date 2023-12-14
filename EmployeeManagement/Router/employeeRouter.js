const express = require("express");
const employeeController = require("../Controller/employeeController.js");
const {
  authVerify,
  subAuthVerify,
} = require("../Controller/authVerification.js");


const Router = express.Router();

const subRouter = express.Router();

//Create Employee
Router.route("/create").post(authVerify, employeeController.createEmployee);

//Get All Employees
Router.route("/get").get(authVerify, employeeController.getAllEmployee);

// Get Employee By Id
Router.route("get/:id").get(authVerify, employeeController.getEmployeeById);

// Search Employees By Name
Router.route("/search/name/:value").get(authVerify, employeeController.searchEmployeesByName);

// Search Employees By Email
Router.route("/search/email/:value").get(authVerify, employeeController.searchEmployeesByEmail);

// Search Employees By Address
Router.route("/search/address/:value").get(authVerify, employeeController.searchEmployeesByAddress);

// Search Employees By Mobile
Router.route("/search/mobile/:value").get(authVerify, employeeController.searchEmployeesByMobile);

// Search Employees By All Fields Name
Router.route("/search/anyfield/:value").get(authVerify, employeeController.searchEmployees);


//Update Employee By Id
Router.route("/update/:id").put(authVerify, employeeController.updateEmployee);

//Delete Employee By Id
Router.route("/delete/:id").delete(
  authVerify,
  employeeController.deleteEmployee
);

//Subscribe User Router
Router.use("/subscribe", subRouter);

//Get Employee By Highest Salary Employees
subRouter.route("/paysalary").get(subAuthVerify, employeeController.paySalary);

//Get Salary Categary Employees Using Bucket
subRouter.route("/rights").get(subAuthVerify, employeeController.getEmployeeRights);

// Which employees have received salary?
subRouter.route("/highest-salary-employee").get(subAuthVerify, employeeController.highest_Salary_Employees);

//Who is employee and what is his role in company?
subRouter.route("/salary-categary-employees").get(subAuthVerify, employeeController.salary_Categary_Employees);



module.exports = Router;
