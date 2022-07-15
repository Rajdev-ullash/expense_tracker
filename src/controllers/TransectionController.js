const TransectionModel = require("../models/TransectionModel");
const mongoose = require("mongoose");
//create transection
exports.createTransection = (req, res) => {
  let reqBody = req.body;
  reqBody.user = req.headers["id"];
  TransectionModel.create(reqBody, (err, result) => {
    if (err) {
      res.status(200).json({
        status: "fail",
        data: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

//get dashboard transection
exports.getTransection = (req, res) => {
  let id = req.headers["id"];
  TransectionModel.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(id) } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
        avg: { $avg: "$amount" },
        max: { $max: "$amount" },
        min: { $min: "$amount" },
      },
    },
  ]).exec((err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        status: "fail",
        data: err,
      });
    } else {
      let total_invest = [];
      let total_expense = [];

      result.map((item) => {
        if (item._id === "Income") {
          total_invest.push(item.total);
        }
        if (item._id === "Expense") {
          total_expense.push(item.total);
        }
      });
      let total_money = total_invest[0] - total_expense[0];
      res.status(200).json({
        status: "success",
        data: result,
        total_money: total_money,
      });
    }
  });
  // TransectionModel.find({ user: id }, (err, result) => {
  //   if (err) {
  //     res.status(400).json({
  //       status: "fail",
  //       data: err,
  //     });
  //   } else {
  //     res.status(200).json({
  //       status: "success",
  //       data: result,
  //     });
  //   }
  // });
};

//get user transection

exports.getUserTransection = (req, res) => {
  let id = req.headers["id"];
  let param = req.params.id;
  TransectionModel.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(id) } },
    { $sort: { _id: -1 } },
    { $limit: parseInt(param) },
  ]).exec((err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        status: "fail",
        data: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.getUserTotalTransection = (req, res) => {
  let id = req.headers["id"];

  TransectionModel.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(id) } },
    { $count: "amount" },
  ]).exec((err, result) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: err,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};
