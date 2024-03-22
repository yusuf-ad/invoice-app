const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.route("/").get(authController.protect, userController.getAllUsers);

router.route("/:id").get(userController.getUser);

module.exports = router;
