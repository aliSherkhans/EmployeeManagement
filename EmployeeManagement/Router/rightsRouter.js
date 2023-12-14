const express = require("express");
const empRightsController = require("../Controller/empRightsController");
const { authVerify } = require("../Controller/authVerification.js");

const Router = new express.Router();

Router.route("/add").post(authVerify, empRightsController.createRights);
Router.route("/getbyname").get(authVerify, empRightsController.getRightsByName);
Router.route("/get").get(authVerify, empRightsController.getAllRights);
Router.route("/add-in-rights-a-new-employee").patch(
  authVerify,
  empRightsController.addInRights_a_NewEmployee
);
Router.route("/update").put(authVerify, empRightsController.updateRights);
Router.route("/delete/:id").delete(
  authVerify,
  empRightsController.deleteRights
);

module.exports = Router;
