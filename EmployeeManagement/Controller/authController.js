const userModel = require("../Database/model/userModel.js");
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const CustomError = require("../utils/customError.js");
const config = require("../config.js");

//Create User
exports.signUp = asyncErrorHandler(async (req, resp, next) => {
  const userData = req.body;
  if (!userData.confirmPassword) {
    const err = new CustomError("Re-enter password", 400);
    return next(err);
  } else if (userData.confirmPassword !== userData.password) {
    const err = new CustomError("Cofirm password is not match", 400);
    return next(err);
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);
  userData.password = passwordHash;

  const token = jwt.sign({ userData }, config.SECRET_KEY, { expiresIn: "24h" });

  delete userData["confirmPassword"];
  const newUser = await userModel.create(userData);
  newUser.password = undefined;

  resp.status(201).json({
    status: "Success",
    usre: newUser,
    token,
  });
  next()
});

//Get User By Email
exports.getUserByEmail = asyncErrorHandler(async(req, resp, next)=>{
  const EXISTS_USER = await userModel.findOne({email : req.body.email});
  if(!EXISTS_USER){
    const error = new CustomError("User Not Found", 404);
    return next(error);
  }

  resp.status(200).json({
    status : "Success",
    User : EXISTS_USER
  })
})

//Log In User
exports.logIn = asyncErrorHandler(async (req, resp, next) => {
  const userData = req.body;
  let token = "";
  const existsUser = await userModel.findOne({ email: userData.email });
  if (existsUser) {
    const checkPassword = await bcrypt.compare(
      userData.password,
      existsUser.password
    );
    if (checkPassword) {
      token = jwt.sign({ userData }, config.SECRET_KEY, { expiresIn: "24h" });
    } else {
      const err = new CustomError("Password is incurrect", 400);
      return next(err);
    }
  } else {
    const err = new CustomError("User not found", 404);
    return next(err);
  }

  resp.status(200).json({
    status: "Success",
    message: "Successfully Login",
    token,
  });
  next()
});

//Update User By Id
exports.updateProfile = asyncErrorHandler(async (req, resp, next) => {
  const { id } = req.params;
  let existsUser = await userModel.findById(id);
  let token = "";
  if (existsUser) {
    if (req.body.password) {
      const updatePassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = updatePassword;
      token = jwt.sign(req.body, config.SECRET_KEY, { expiresIn: "24h" });
    }
    existsUser = await userModel.findByIdAndUpdate(id, { $set: req.body }, {new : true});
  } else {
    const error = new CustomError("User not found", 404);
    return next(error);
  }

  existsUser.password = undefined;

  resp.status(200).json({
    status: "Success",
    message: "Update profile",
    updateProfile : existsUser,
    token,
  });
});

//LogOut User
exports.logOut = asyncErrorHandler(async (req, resp, next) => {
  const existsUser = await userModel.findOne({ email: req.body.email });
  if (existsUser) {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      existsUser.password
    );
    if (checkPassword) {
      await userModel.findOneAndUpdate(
        { email: req.body.email },
        { $set: { activity: false } }
      );
    } else {
      const error = new CustomError("Password is incurrect", 400);
      return next(error);
    }
  } else {
    const error = new CustomError("User not found", 404);
    return next(error);
  }

  resp.status(200).json({
    status: "Success",
    message: "Logout successfully",
  });
});


//Set User Profile Photo
exports.set_Profile_Photo = asyncErrorHandler(async(req, resp, next)=>{
   const filePath = req.file.path;
   const userData = req.userData;
   const existsUser = await userModel.findOne({email : userData.email});

   if(!existsUser){
    const error = new CustomError("User Not Found", 404);
    next(error);
   }
  
 await userModel.findOneAndUpdate({email : userData.email}, {$set : {profileImage : filePath}})

   resp.status(200).json({
    status : "Success",
    message : "Update Profile Photo",
    profileImagePath : filePath
   });

})

//Buy the Subscription For Premium Data In application
exports.buySubscribe = asyncErrorHandler(async(req, resp, next)=>{
  const {payMent, email} = req.body;
  const existsUser = await userModel.findOne({email : email});

  if(!existsUser){
    const error = new CustomError("User Not Found", 404);
    return next(error);
  }else if(payMent > 0){
    await userModel.findOneAndUpdate({email : email}, {$set : {userType : "Subscriber"}})
  }

  resp.status(200).json({
    status : "Success",
    message : "Buy a subscribe",
  })
})

