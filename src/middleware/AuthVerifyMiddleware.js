const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let Token = req.headers["token"];

  jwt.verify(Token, "SecretKey12345678", (err, decoded) => {
    if (err) {
      console.log(Token);
      res.status(401).json({
        status: "UnAuthorized",
      });
    } else {
      let id = decoded["data"];
      console.log(id);
      req.headers.id = id;
      next();
    }
  });
};
