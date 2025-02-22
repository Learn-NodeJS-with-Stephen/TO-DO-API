const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");


router.post("/", usersController.createUser);
router.post("/login", usersController.loginUser);
router.get("/tasks", usersController.getUserTasks);

module.exports = router;
