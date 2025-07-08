const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const auth = require("../middleware/auth");
//index.js -> tasksRoute -> tasksCOntroller

router.post("/", tasksController.createTask);
router.get("/", tasksController.getAllTasks);
router.get("/unfinished", tasksController.getallUnfinishedTasks);
router.get("/completed", tasksController.getAllCompletedTasks);
router.get("/:taskId", tasksController.getSingleTask);
// router.put("/:taskId", tasksController.updateTask);
router.put("/:taskId", tasksController.updateTask);
router.delete("/completed", tasksController.deleteAllCompletedTask);
router.delete("/:taskId", tasksController.deleteTask);
router.delete("/", tasksController.deleteAllTask);

module.exports = router;