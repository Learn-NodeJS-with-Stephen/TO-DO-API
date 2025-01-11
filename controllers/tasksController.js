const tasks = [];
// Create tasks controller

class TasksController {

    //Create a task
    createTask(req, res) {
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
        res.status(201).json({
            "success": true,
            "message": "Task created successfully",
            "data": newTask
        });
    };

    getAllTasks(req, res) {
        return res.status(200).json({
            "success": true,
            "message": "All Tasks",
            "data": tasks
        });
    };


    //TODO: 11/1/2025 - COnvert all the current endpoints to follow the routes->controllers logic
    //TODO: Adding users to the task

    // //Get all tasks
    // app.get('/tasks', (req, res) => {
    //     return res.status(200).json({
    //         "success": true,
    //         "message": "All Tasks",
    //         "data": tasks
    //     });
    // });

    // //Get single task
    // app.get('/tasks/:taskId', (req, res) => {
    //     const taskId = req.params.taskId
    //     const task = tasks.find((t) => t.id == taskId);
    //     return res.status(200).json({
    //         "success": true,
    //         "message": "Single Task",
    //         "data": task
    //     });
    // });

    // //Update a task
    // app.put('/tasks/:taskId', (req, res) => {
    //     const taskId = req.params.taskId
    //     const task = tasks.find((t) => t.id == taskId);
    //     if(!task) {
    //         return res.status(400).json({
    //             "success": false,
    //             "message": "Task not found"
    //         });
    //     }
    //     const { title, description, completed } = req.body;
    //     if(title !== undefined) task.title = title;
    //     if(description !== undefined) task.description = description;
    //     if(completed !== undefined) task.completed = completed;

    //     return res.status(200).json({
    //         "success": true,
    //         "message": "Task updated successfully",
    //         "data": task
    //     });
    // });

    // //Delete a task
    // app.delete('/tasks/:taskId', (req, res) => {
    //     const taskId = req.params.taskId;
    //     const task = tasks.find((t) => t.id == taskId);
    //     if(!task) {
    //         return res.status(400).json({
    //             "success": false,
    //             "message": "Task not found"
    //         });
    //     }
    //     //Find the index of the task in the tasks array and then remove it from the array
    //     const taskIndex = tasks.findIndex((t) => t.id == taskId);
    //     tasks.splice(taskIndex, 1);
        
    //     return res.status(200).json({
    //         "success": true,
    //         "message": "Task deleted successfully",
    //         "data": ""
    //     });
    // });
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
}

module.exports = new TasksController()