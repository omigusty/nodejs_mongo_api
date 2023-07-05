const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.route("/api/user").post(userController.login).get(userController.login);
router.post("/api/user/register", userController.register);

module.exports = router;
