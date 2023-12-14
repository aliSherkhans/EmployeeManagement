const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema({
    name : {
        type : String,
        mimlength : 1,
        maxlength : 50,
        required : [true, "Name is mindetory"]
    },

    age :{
        type : Number,
        required : true
    },

    mobile : {
        type : String,
        required : true,
        validate : {
            validator : function(mobile){
                return /^[6-9]\d{9}$/.test(mobile);
            },
            message : "Invalid Mobile Number" 
        }
    },

    email : {
        type : String,
        unique : true,
        required : true,
        validate : {
            validator : function(email){
                return /\b[A-Za-z0-9._%+-]+@[gmail.-]+\.[A-Z|a-z]{2,}\b/.test(email)
            },
            message : "Invalid Email"
        }
    },    

    type : {
        type : String,
        required : true
    },

    salary : {
        type : Number,
        default : 5000
    },

    experience : {
        type : String,
        default : "Fersher"
    },

    address : {
        type : String,
        required : true
    },

    joiningDate : {
        type : Date,
        default : ()=> Date.now()
    }
});

module.exports = new mongoose.model("employee", Schema, "employee");