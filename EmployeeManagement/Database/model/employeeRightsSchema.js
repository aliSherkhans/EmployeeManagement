const mongoose = require("mongoose");

const rightSchema = mongoose.Schema({
  empId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
  ],

  rights: {
    type: String,
    require: true,
    unique: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },

  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(
  "employeeRights",
  rightSchema,
  "employeeRights"
);
