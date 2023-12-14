const nodEmailer = require("nodemailer");
const CustomError = require("../utils/customError");
const config = require("../config");

//Email Send Using nodemailer
exports.sendEmail = async (req, resp, next)=>{
    const {email} = req.body;
    const isFor = req.url.slice(1).charAt(0).toUpperCase().concat(req.url.slice(2));

//SMTP connect
    const transpoter = nodEmailer.createTransport({
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth: {
            user: config.USER,
            pass: config.PASS
        }
    });

    transpoter.sendMail({
        from : "mohassan2786@gmail.com",
        to : email,
        subject : `EmployeeManagement Application ${isFor}`,
        html:`<h1>Hello,
        You are successfully ${isFor}</h1>`
    }, (err)=>{
        if(err){
           const error = new CustomError(err.message, 500);
           next(error)
        }
    })
}
