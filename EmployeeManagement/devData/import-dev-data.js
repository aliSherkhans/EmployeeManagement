const mongoose = require("mongoose");
const emploeeModel = require("../Database/model/employeeSchema");
const fs = require("fs");
const config = require("../config");
const path = require("path");


mongoose.connect(config.LOCAL_CONN_STR, {useNewUrlParser : true})
.then(()=>console.log("SuccessFully connection"))
.catch((error)=>console.log(error.message));


const employees = JSON.parse(fs.readFileSync("./employees.json", "utf-8"));

const createEmployee = async()=>{
    try{
        await emploeeModel.create(employees);
        console.log("create employees");
    }catch(error){
        console.log(error.message);
    }

    process.exit()
}


const deleteEmployee = async()=>{
    try{
        await emploeeModel.deleteMany();
        console.log("Delete employees");
    }catch(error){
        console.log(error.message);
    }

    process.exit()
}

if(process.argv[2] === "--import"){
    createEmployee();
}else if(process.argv[2] === "--delete"){
    deleteEmployee()
}