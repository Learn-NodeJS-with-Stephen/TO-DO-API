const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const tasksController = require("../controllers/tasksController");

router.post("/", usersController.createUser);
router.get("/", usersController.getAllUsers);
// router.get("/unfinished", usersController.getAllUnfinishedUsers);
// router.get("/completed", usersController.getAllCompletedUsers);
router.get("/:userId", usersController.getSingleUser);
router.put("/:userId", usersController.updateUser);
router.delete("/completed", usersController.deleteAllCompletedUser);
router.delete("/:userId", usersController.deleteUser);
router.delete("/", usersController.deleteAllUser);
module.exports = router;
