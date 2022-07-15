const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    amount: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      default: "Income",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersModel",
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const TransectionModel = mongoose.model("transection", DataSchema);
module.exports = TransectionModel;
