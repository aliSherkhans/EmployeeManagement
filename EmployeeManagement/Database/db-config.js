const mongoose = require("mongoose");
const config = require(".././config");

//MongoDB Connection
mongoose.connect(config.LOCAL_CONN_STR, {useNewUrlParser : true})
.then(()=>console.log("SuccessFully connection"))
.catch((error)=>console.log(error.message, error.name));