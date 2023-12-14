const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const config = require("../config.js");
const CustomError = require("../utils/customError");
const userModel = require("../Database/model/userModel.js");

//User Verification
exports.authVerify = asyncErrorHandler(async (req, resp, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    const tokenVerify = jwt.verify(token, config.SECRET_KEY); 
    req.userData = tokenVerify.userData;
    if (tokenVerify) {
        next();
    } else {
      const error = new CustomError("Authentication Feild Token is not valid", 401);
      next(error);
    }
  } else {
    const error = new CustomError("Token is required", 400);
    next(error);
  }
});

//Subscriber User Verification
exports.subAuthVerify  = asyncErrorHandler(async(req, resp, next)=>{
    const token = req.headers["authorization"]?.split(" ")[1];
    if(token){
      const userData = jwt.verify(token, config.SECRET_KEY);
      const user = await userModel.findOne({email : userData.userData.email});
      if(user.userType === "Subscriber"){
        next();
      }else{
        const error = new CustomError("You Are Not A Subscriber, Pleass Buy A Subscriber", 400)
        next(error);
      }
    }else{
      const error = new CustomError("Authorization Faild.", 403);
      next(error);
    }
})
