const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

//router object
const router = express.Router();
//Get all users \\GET
router.get("/all-users", getAllUsers);

// Create user || POST
router.post("/register", registerController);

//Login
router.post("/login", loginController);

module.exports = router;
