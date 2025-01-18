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

    // //Create a task
    // app.post("/tasks", (req, res) => {
    //   console.log("Request body:: ", req.body);
    //   const { title, description } = req.body;
    //   if (!title) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Title is required",
    //     });
    //   }
    //   const newTask = {
    //     id: tasks.length + 1,
    //     title: title,
    //     description: description || "",
    //     completed: false,
    //   };
    //   tasks.push(newTask);
    //   return res.status(201).json({
    //     success: true,
    //     message: "Task created successfully",
    //     data: newTask,
    //   });
    // });
  
    // //Get all tasks
    // app.get('/tasks', (req, res) => {
    //     return res.status(200).json({
    //         "success": true,
    //         "message": "All Tasks",
    //         "data": tasks
    //     });
    // });

    // Get all unfinished tasks
    // app.get("/tasks/unfinished", (req, res) => {
    //   const unfinishedTasks = tasks.filter((task) => task.completed == false);
    //   return res.status(200).json({
    //     success: true,
    //     message: "All Unfinished Tasks",
    //     data: unfinishedTasks,
    //   });
    // });

    // // Get all completed tasks
    // app.get("/tasks/completed", (req, res) => {
    //   const completedTasks = tasks.filter((task) => task.completed);
    //   return res.status(200).json({
    //     success: true,
    //     message: "All Completed Tasks",
    //     data: completedTasks,
    //   });
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

    // Delete all completed tasks
    // app.delete("/tasks/completed", (req, res) => {
    //   const initialLength = tasks.length;
    //   for (let i = tasks.length - 1; i >= 0; i--) {
    //     if (tasks[i].completed === true) tasks.splice(i, 1);
    //   }
    //   // tasks = tasks.filter((task) => task.completed == false); // Keep only unfinished tasks
    //   const deletedCount = initialLength - tasks.length;

    //   return res.status(200).json({
    //     success: true,
    //     message: `${deletedCount} completed task(s) deleted successfully`,
    //     data: "",
    //   });
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

    // // Delete all tasks
    // app.delete("/tasks", (req, res) => {
    //   const deletedCount = tasks.length;
    //   tasks.length = 0; // Clear the tasks array

    //   return res.status(200).json({
    //     success: true,
    //     message: `${deletedCount} task(s) deleted successfully`,
    //     data: "",
    //   });
    // });

    // app.listen(PORT, () => {
    //   console.log(`Server running on ${PORT}`);
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
