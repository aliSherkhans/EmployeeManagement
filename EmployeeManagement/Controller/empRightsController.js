const employeeRightsModel = require("../Database/model/employeeRightsSchema");
const CustomError = require("../utils/customError");

// CRUD Operation 
module.exports = {
  createRights: async (req, resp) => {
    const rights = await employeeRightsModel.create(req.body);

    resp.status(201).json({
      status: "Success",
      message: "Create Rights",
      rights,
    });
  },

  getRightsByName: async (req, resp, next) => {
    const rightsData = await employeeRightsModel.find({
      rights: req.query.rights,
    });

    if (rightsData.length <= 0) {
      const error = new CustomError(
        `This rights ${req.query.rights} not found`,
        404
      );
      return next(error);
    }

    resp.status(200).json({
      status: "Success",
      rightsData,
    });
  },

  getAllRights: async (req, resp, next) => {
    const rightsData = await employeeRightsModel.find();

    if (rightsData.length <= 0) {
      const error = new CustomError(`Rights Not Found`, 404);
      return next(error);
    }

    resp.status(200).json({
      status: "Success",
      rightsData,
    });
  },

  addInRights_a_NewEmployee: async (req, resp, next) => {
    let existsRights = await employeeRightsModel.findOne({
      rights: req.query.rights,
    });
    if (!existsRights) {
      const error = new CustomError(`Rights Not Found`, 404);
      return next(error);
    } else if (req.body.empId) {
      existsRights = await employeeRightsModel.findOneAndUpdate(
        { rights: req.query.rights },
        { $push: { empId: req.body.empId } },
        { new: true }
      );
    }

    resp.status(200).json({
      status: "Success",
      updateRights: existsRights,
    });
  },

  updateRights: async (req, resp, next) => {
    let existsRights = await employeeRightsModel.findOne({
      rights: req.query.rights,
    });
    if (!existsRights) {
      const error = new CustomError(`Rights Not Found`, 404);
      return next(error);
    } else if (req.body.empId) {
      const error = new CustomError(
        "You not directly update empId because empid is array",
        400
      );
      return next(error);
    }
    existsRights = await employeeRightsModel.findOneAndUpdate(
      { rights: req.query.rights },
      req.body,
      { new: true }
    );

    resp.status(200).json({
      status: "Success",
      updateRights: existsRights,
    });
  },

  deleteRights: async (req, resp, next) => {
    const existsRights = await employeeRightsModel.findById(req.params.id);
    if (!existsRights) {
      const error = new CustomError(`Rights Not Found`, 404);
      return next(error);
    }
    await employeeRightsModel.findByIdAndDelete(req.params.id);

    resp.status(200).json({
      status: "Success",
      message: "Rights Successfully Delete",
    });
  },
};
