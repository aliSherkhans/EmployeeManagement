const multer = require("multer");
const userModel = require("../Database/model/userModel");

//Stor User Files
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "UserFiles");
    },

    filename : async function(req, file, cb){
        const {email} = req.userData;
        const existsUser = await userModel.findOne({email})
         cb(null, `${Date.now()}-${existsUser._id}-${file.originalname}`);
    }
})

exports.uploadFile = multer({storage}).single("profileImage");