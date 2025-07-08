const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const auth = require("../middleware/auth");


router.post("/", usersController.createUser);
router.post("/login", usersController.loginUser);
router.get("/tasks", auth, usersController.getUserTasks);

module.exports = router;