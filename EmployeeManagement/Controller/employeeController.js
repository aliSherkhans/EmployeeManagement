const employeeModel = require("../Database/model/employeeSchema.js");
const salaryModel = require("../Database/model/salarySchema.js");
const CustomError = require("../utils/customError.js");
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const ApiFeature = require("../utils/ApiFeature.js");
const employeeRightsModel = require("../Database/model/employeeRightsSchema.js");

//Create employee
exports.createEmployee = asyncErrorHandler(async (req, resp, next) => {
  const newEmployee = req.body;
  const addNewEmployee = await employeeModel.create(newEmployee);

  resp.status(201).json({
    status: "Success",
    message: "Successfully add employee",
    employee: addNewEmployee,
  });
});

//Get All Employees
exports.getAllEmployee = asyncErrorHandler(async (req, resp, next) => {
  const data = new ApiFeature(employeeModel.find(), req.query);
  const employeeData = await data.query;
  if (employeeData.length <= 0) {
    const error = new CustomError("Record not found database is empty", 404);
    return next(error);
  }

  resp.status(200).json({
    status: "Success",
    employeeData,
  });
});

// Get Employee By Id
exports.getEmployeeById = asyncErrorHandler(async (req, resp, next) => {
  const employee = await employeeModel.findById(req.params.id);
  if (!employee) {
    const error = new CustomError("Employee not found", 404);
    return next(error);
  }

  resp.status(200).json({
    status: "Success",
    employee,
  });
});

//Update Employee By Id
exports.updateEmployee = asyncErrorHandler(async (req, resp, next) => {
  const { id } = req.params;
  let existsEmployee = await employeeModel.findById(id);
  if (!existsEmployee) {
    const error = new CustomError("Employee not found", 404);
    return next(error);
  }

  existsEmployee = await employeeModel.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );

  resp.status(200).json({
    status: "Success",
    updateEmployee: existsEmployee,
  });
});

//Delete Employee By Id
exports.deleteEmployee = asyncErrorHandler(async (req, resp, next) => {
  const { id } = req.params;
  const existsEmployee = await employeeModel.findById(id);
  if (!existsEmployee) {
    const error = new CustomError("Employee not found", 404);
    return next(error);
  }
  await employeeModel.findByIdAndDelete(id);
  resp.status(200).json({
    status: "Success",
    message: "Delete employee",
  });
});

// Search Employees By Name
exports.searchEmployeesByName = asyncErrorHandler(async(req, resp, next)=>{
   const searchBy = req.params.value;
   const employeeData = await employeeModel.find({
    $or : [
      {name : {$regex : searchBy, $options : "i"}}
    ]
   });

   if(employeeData.length <= 0){
    const error = new CustomError("Employees Data Not Found", 404);
    return next(error);
   };

   resp.status(200).json({
    status : "Success",
    data : employeeData
   })
});

// Search Employees By Email
exports.searchEmployeesByEmail = asyncErrorHandler(async(req, resp, next)=>{
  const searchBy = req.params.value;
  const employeeData = await employeeModel.find({
   $or : [
     {email : {$regex : searchBy, $options : "i"}}
   ]
  });

  if(employeeData.length <= 0){
   const error = new CustomError("Employees Data Not Found", 404);
   return next(error);
  };

  resp.status(200).json({
   status : "Success",
   data : employeeData
  })
});

// Search Employees By Address
exports.searchEmployeesByAddress = asyncErrorHandler(async(req, resp, next)=>{
  const searchBy = req.params.value;
  const employeeData = await employeeModel.find({
   $or : [
     {address : {$regex : searchBy, $options : "i"}}
   ]
  });

  if(employeeData.length <= 0){
   const error = new CustomError("Employees Data Not Found", 404);
   return next(error);
  };

  resp.status(200).json({
   status : "Success",
   data : employeeData
  })
});

// Search Employees By Mobile
exports.searchEmployeesByMobile = asyncErrorHandler(async(req, resp, next)=>{
  const searchBy = req.params.value;
  const employeeData = await employeeModel.find({
   $or : [
     {mobile : {$regex : searchBy, $options : "i"}}
   ]
  });

  if(employeeData.length <= 0){
   const error = new CustomError("Employees Data Not Found", 404);
   return next(error);
  };

  resp.status(200).json({
   status : "Success",
   data : employeeData
  })
});

// Search Employees By All Fields Name
exports.searchEmployees = asyncErrorHandler(async(req, resp, next)=>{
  const searchBy = req.params.value;
  const employeeData = await employeeModel.find({
    $or : [
         {name : {$regex : searchBy, $options : "i"}},
         {email : {$regex : searchBy, $options : "i"}},
         {mobile : {$regex : searchBy, $options : "i"}},
         {address : {$regex : searchBy, $options : "i"}},
    ]
  });

  if(employeeData.length <= 0){
    const error = new CustomError("Employees Data Not Found", 404);
    return next(error);
  };

  resp.status(200).json({
    status : "Success",
    data : employeeData
  });
})

//Get Employee By Highest Salary Employees
exports.highest_Salary_Employees = asyncErrorHandler(async(req, resp, next)=>{
  const data = await employeeModel.aggregate([
    {$sort : {salary : -1}},
    {$limit : 2}
  ]);

  if(data.length <= 0){
    const error = new CustomError("Employee Not Found", 400);
    return next(error);
  };

  resp.status(200).json({
    status : "Success",
    data,
  })
});

//Get Salary Categary Employees Using Bucket
exports.salary_Categary_Employees = asyncErrorHandler(async(req, resp, next)=>{
  console.log(req.file);
  const data = await employeeModel.aggregate([
    {
      $bucket : {
        groupBy : "$salary",
        boundaries:[5000, 15000, 30000, 50000, 80000, 100000],
        default : "gerter then 100000",
        output : {
           count  : {$sum : 1},
           details : { $push : "$$ROOT"
        }
      }
      }
      },

      {
        $project : {
          "_id": 1 ,
            "count":  1,
            "details" :{
                    "name": 1,
                    "age": 1,
                    "mobile": 1,
                    "email": 1,
                    "salary": 1,
                    "experience": 1,
                    "joiningDate": 1
                }
              }
        }
  ]);

  if(data.length <= 0){
    const error = new CustomError("Employee Not Found", 404);
    return next(error);
  }

  resp.status(200).json({
    status : "Success",
    data,
  })
}) 


// Which employees have received salary?
exports.paySalary = asyncErrorHandler(async (req, resp, next) => {
  const getSalary = await employeeModel.aggregate([
    {
      $lookup: {
        from: "salary",
        localField: "_id",
        foreignField: "empId",
        as: "PaySalary",
      },
    },

    { $unwind: "$PaySalary" },

    {
      $project: {
        name: 1,
        email: 1,
        type: 1,
        salary: 1,
        amount: "$PaySalary.amount",
        paymentMethod: "$PaySalary.paymentMethod",
        date: "$PaySalary.date",
      },
    },
  ]);

  if (getSalary.length <= 0) {
    const error = new CustomError(
      "You did not pay the salary to the employer",
      404
    );
    return next(error);
  }

  resp.status(200).json({
    status: "success",
    getSalary,
  });
});

//Who is employee and what is his role in company?
exports.getEmployeeRights = asyncErrorHandler(async (req, resp, next) => {
  const empRole = await employeeRightsModel.find().populate({
    path: "empId",
    select : ["name", "mobile", "email", "type", "salary", "joiningDate"]
  });

  resp.status(200).json({
    empRole,
  });
});

//Nested Populate
exports.nestedPopulate = asyncErrorHandler(async (req, resp, next) => {
  const empRole = await employeeRightsModel.find().populate({
    path: "empId",
    model: "employee",
    populate: {
      path: "saId",
      model: "salary",
      populate: {
        path: "riId",
      },
    },
  });

  resp.status(200).json({
    empRole,
  });
});
