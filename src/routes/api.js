const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");
const TransectionController = require("../controllers/TransectionController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");

router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);

router.post(
  "/createTransection",
  AuthVerifyMiddleware,
  TransectionController.createTransection
);

router.get(
  "/getTransection",
  AuthVerifyMiddleware,
  TransectionController.getTransection
);

router.get(
  "/getUserTransection/:id",
  AuthVerifyMiddleware,
  TransectionController.getUserTransection
);
router.get(
  "/getUserTotalTransection",
  AuthVerifyMiddleware,
  TransectionController.getUserTotalTransection
);

module.exports = router;
