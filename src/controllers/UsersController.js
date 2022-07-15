const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//users registration

exports.registration = (req, res) => {
  const reqBody = req.body;
  const hashedPassword = bcrypt.hashSync(reqBody.password, 12);
  UsersModel.create(
    {
      name: reqBody.name,
      email: reqBody.email,
      password: hashedPassword,
    },
    (err, result) => {
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
    }
  );
};

//users login
exports.login = (req, res) => {
  const reqBody = req.body;
  const user = UsersModel.find({ email: reqBody.email }, (err, result) => {
    if (err) {
      res.status(200).json({
        status: "fail",
        data: err,
      });
    } else {
      if (result.length > 0) {
        const passwordIsValid = bcrypt.compareSync(
          reqBody.password,
          result[0].password
        );
        if (passwordIsValid) {
          let Payload = {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: result[0]._id,
          };
          console.log(Payload.data);
          let token = jwt.sign(Payload, "SecretKey12345678");
          res.status(200).json({
            status: "success",
            token: token,
            data: result[0],
          });
        } else {
          res.status(200).json({
            status: "fail",
            data: "Invalid email and password",
          });
        }
      } else {
        res.status(200).json({
          status: "fail",
          data: "Invalid email and password",
        });
      }
    }
  });

  // if (!user) {
  //   return res.status(400).send({ message: "email & password does not exist" });
  // } else if (!bcrypt.compareSync(req.body.password, user.password)) {
  //   return res.status(400).send({ message: "The password is invalid" });
  // } else {
  //   let Payload = {
  //     exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  //     data: user.email,
  //   };
  //   let token = jwt.sign(Payload, "SecretKey12345678");
  //   res.status(200).json({
  //     status: "success",
  //     token: token,
  //     data: user,
  //   });
  // }
};
