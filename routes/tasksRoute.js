const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const auth = require("../middleware/auth");
//index.js -> tasksRoute -> tasksCOntroller

router.post("/", auth, tasksController.createTask);
router.get("/", auth, tasksController.getAllTasks);
router.get("/unfinished", auth, tasksController.getallUnfinishedTasks);
router.get("/completed", auth, tasksController.getAllCompletedTasks);
router.get("/:taskId", auth, tasksController.getSingleTask);
router.put("/:taskId", auth, tasksController.updateTask);
router.delete("/completed", auth, tasksController.deleteAllCompletedTask);
router.delete("/:taskId", auth, tasksController.deleteTask);
router.delete("/", auth, tasksController.deleteAllTask);

module.exports = router;
