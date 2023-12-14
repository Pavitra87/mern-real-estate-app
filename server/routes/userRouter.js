const express = require("express");
const {
  signupController,
  signinController,
  google,
  updateController,
  deleteUserController,
  signOutController,
  getUser
} = require("../controllers/userController");
const verifyToken = require("../utils/verifyuser");

const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/google", google);
router.post("/update/:id", verifyToken, updateController);
router.delete("/delet/:id", verifyToken, deleteUserController);
router.get("/signout", signOutController);
router.get('/:id',verifyToken,getUser)

module.exports = router;
