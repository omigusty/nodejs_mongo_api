const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router
  .route("/api/authentication/login")
  .post(userController.login)
  .get(userController.login);
router.post("/api/authentication/register", userController.register);

module.exports = router;
