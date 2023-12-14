const express = require("express");
const authController = require("../Controller/authController.js");
const { authVerify } = require("../Controller/authVerification.js");
const {uploadFile } = require("../middleware/userFiles.js");
const {sendEmail} = require("../middleware/emailSender.js");

const Router = express.Router();

//SignUp User
Router.route("/signup").post(authController.signUp, sendEmail);

//LogIn User
Router.route("/login").post(authController.logIn, sendEmail);

//Get User By Email
Router.route("/get").get(authVerify, authController.getUserByEmail);

//Update User Profile Photo
Router.route("/update/profile-photo").put(authVerify, uploadFile, authController.set_Profile_Photo);

//Update User Profile
Router.route("/update/:id").put(authVerify, authController.updateProfile);

//LogOut User
Router.route("/logout").delete(authVerify, authController.logOut);

//Buy the Subscription For Premium Data In application
Router.route("/buysubscriber").patch(authVerify, authController.buySubscribe);

module.exports = Router;
