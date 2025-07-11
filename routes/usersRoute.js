const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const auth = require("../middleware/auth");

router.post("/", usersController.createUser);
router.post("/login", usersController.loginUser);
router.get("/tasks", auth, usersController.getUserTasks);
router.get("/profile", auth, usersController.getUserProfile);
router.put("/profile", auth, usersController.updateUserProfile);
router.put("/update-password", auth, usersController.updatePassword);

module.exports = router;
