//21-12-2024 - Author: Stephen Akugbe

/*TODO: 
- Read the difference between Import and Require (ES6 syntax, ES5 syntax) - History of JS - ECMA
- Read about naming conventions for API endpoints
- Read on the difference between '==' and '===' in JS
Routes and Controllers

*/

//dev, prod, local
//local -> dev -> prod
//main = prod
//dev = dev, uat, stage, 
//local = feature/..., fix/..., hotfix/... GIT, github, gitlab, bitbucket
const express = require("express");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

//TODO-API
/**
 * Create a task - POST /tasks
 * Get all tasks - GET /tasks
 * Get a task - GET /tasks/:id
 * Update a task - PUT /tasks/:id
 * Delete a task - DELETE /tasks/:id
 */

const tasks = [];
// title: string, description: string, completed: boolean

// /save-task -No verbs in your endpoint name

//Create a task
app.post('/tasks', (req, res) => {
    console.log("Request body:: ", req.body);
    const { title, description } = req.body;
    if(!title){
        return res.status(400).json({
            "success": false,
            "message": "Title is required"
        });
    }
    const newTask = {
        id: tasks.length + 1,
        title: title,
        description: description || '',
        completed: false
    };
    tasks.push(newTask);
    return res.status(201).json({
        "success": true,
        "message": "Task created successfully",
        "data": newTask
    });
});

//Get all tasks
app.get('/tasks', (req, res) => {
    return res.status(200).json({
        "success": true,
        "message": "All Tasks",
        "data": tasks
    });
});

//Get single task
app.get('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId
    const task = tasks.find((t) => t.id == taskId);
    return res.status(200).json({
        "success": true,
        "message": "Single Task",
        "data": task
    });
});

//Update a task
app.put('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId
    const task = tasks.find((t) => t.id == taskId);
    if(!task) {
        return res.status(400).json({
            "success": false,
            "message": "Task not found"
        });
    }
    const { title, description, completed } = req.body;
    if(title !== undefined) task.title = title;
    if(description !== undefined) task.description = description;
    if(completed !== undefined) task.completed = completed;

    return res.status(200).json({
        "success": true,
        "message": "Task updated successfully",
        "data": task
    });
});

//Delete a task
app.delete('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const task = tasks.find((t) => t.id == taskId);
    if(!task) {
        return res.status(400).json({
            "success": false,
            "message": "Task not found"
        });
    }
    //Find the index of the task in the tasks array and then remove it from the array
    const taskIndex = tasks.findIndex((t) => t.id == taskId);
    tasks.splice(taskIndex, 1);
    
    return res.status(200).json({
        "success": true,
        "message": "Task deleted successfully",
        "data": ""
    });
});
/*
TODO: 
- Create an endpoint to get all completed tasks
- Create an endpoint to get all unfinished tasks
- Create an endpoint to delete all completed tasks
- Create an endpoint to delete all tasks
*/

/*TODO:
- Routes and Controllers (only if you understand what routes and controllers do)
- Get A UI to consume this API
-
*/








app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});