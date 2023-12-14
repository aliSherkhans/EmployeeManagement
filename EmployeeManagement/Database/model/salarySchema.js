const { mongoose, Schema } = require("mongoose");

const salarySchema = new mongoose.Schema({
  empId: {
    type: Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = new mongoose.model("salary", salarySchema, "salary");
