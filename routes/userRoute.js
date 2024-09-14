const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:username", getUserByUsername);
router.put("/users/:username", updateUser);
router.delete("/users/:username", deleteUser);

module.exports = router;
