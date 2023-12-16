const express = require("express");
require("./Database/db-config.js");
const authRouter = require("./Router/authRouter.js");
const employeeRouter = require("./Router/employeeRouter.js");
const salaryRouter = require("./Router/salaryRouter.js");
const rightsRouter = require("./Router/rightsRouter.js");
const CustomError = require("./utils/customError.js");
const globalErrorHandler = require("./Controller/globalErrorController.js");
const { authVerify } = require("./Controller/authVerification.js");
//const userModel = require("./Database/model/userModel.js");
// const jwt = require("jsonwebtoken")
// const config = require("./config.js")
const app = express();

app.use(express.urlencoded({extended : false}))
app.use(express.json());


 app.use(express.static("./views"))

 app.set("views engine", "ejs");

//app.route("/home/:token").get(async(req, resp) => {
  // const data = jwt.verify(req.params.token, config.SECRET_KEY)
  // const {email} = data.userData;
  // const existsUser = await userModel.findOne({email})
  // const imagePath = existsUser.profileImage;
  // console.log(imagePath);
//   const HTML = `<div> 
//   <h1>My Image</h1>
//   <img src="./UserFiles/myImage.jpg" alt="Girl in a jacket" width="500" height="600">
//   </div>`
//   resp.write(HTML);
//   resp.end()
// });

app.use("/api/v1/user", authRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/salary", salaryRouter);
app.use("/api/v1/rights", rightsRouter);

app.all("*", (req, resp, next) => {
  const error = new CustomError(
    `yah url ${req.originalUrl} sahi nhi hai.`,
    400
  );
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
