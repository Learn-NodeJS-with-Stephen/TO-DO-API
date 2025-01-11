const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController')

//index.js -> tasksRoute -> tasksCOntroller


router.post('/', tasksController.createTask);
router.get('/', tasksController.getAllTasks);
// router.get('/completed', tasksController.getAllTasks);

module.exports = router