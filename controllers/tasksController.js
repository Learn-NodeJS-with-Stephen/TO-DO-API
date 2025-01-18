const tasks = [];
// title: string, description: string, completed: boolean
class TasksController {
  // /save-task -No verbs in your endpoint name

  //Create a task
  createTask(req, res) {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    const newTask = {
      id: tasks.length + 1,
      title: title,
      description: description || "",
      completed: false,
    };
    tasks.push(newTask);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  }

  getAllTasks(req, res) {
    return res.status(200).json({
      success: true,
      message: "All Tasks",
      data: tasks,
    });
  }

  // Get all unfinished tasks
  getallUnfinishedTasks(req, res) {
    const unfinishedTasks = tasks.filter((task) => task.completed == false);
    return res.status(200).json({
      success: true,
      message: "All Unfinished Tasks",
      data: unfinishedTasks,
    });
  }

  // Get all completed tasks
  getAllCompletedTasks(req, res) {
    const completedTasks = tasks.filter((task) => task.completed);
    console.log("completedTasks", completedTasks);
    return res.status(200).json({
      success: true,
      message: "All Completed Tasks",
      data: completedTasks,
    });
  }

  //Get single task
  getSingleTask(req, res) {
    const taskId = req.params.taskId;
    const task = tasks.find((task) => task.id == taskId);
    return res.status(200).json({
      success: true,
      message: "Single Task",
      data: task,
    });
  }

  //Update task
  updateTask(req, res) {
    const taskId = req.params.taskId;
    console.log(taskId);
    const task = tasks.find((task) => task.id == taskId);
    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }
    const { title, description, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  }

  // Delete all completed tasks
  deleteAllCompletedTask(req, res) {
    const initialLength = tasks.length;
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].completed === true) tasks.splice(i, 1);
    }
    // tasks = tasks.filter((task) => task.completed == false); // Keep only unfinished tasks
    const deletedCount = initialLength - tasks.length;

    return res.status(200).json({
      success: true,
      message: `${deletedCount} completed task(s) deleted successfully`,
      data: "",
    });
  }

  //Delete a task
  deleteTask(req, res) {
    const taskId = req.params.taskId;
    console.log("delete", taskId);
    const task = tasks.find((task) => task.id == taskId);
    console.log("task", task);
    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task not found",
      });
    }
    //Find the index of the task in the tasks array and then remove it from the array
    const taskIndex = tasks.findIndex((t) => t.id == taskId);
    tasks.splice(taskIndex, 1);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: "",
    });
  }

  // Delete all tasks
  deleteAllTask(req, res) {
    const deletedCount = tasks.length;
    tasks.length = 0; // Clear the tasks array

    return res.status(200).json({
      success: true,
      message: `${deletedCount} task(s) deleted successfully`,
      data: "",
    });
  }

  /**
   * ROADMAP
   * 
   * 
   * Authentication && Authorization
   * JWT tokens
   * Middlewares
   * Tasks App -> Sign in -> Mange your tasks -> Logout
   * Databases -> MongoDB (NoSQL) -> MySQL (relational database)
   * User Mangement App APIs
   * Ecommerce App APIs
   * Build your own app
   * 
   */



}

module.exports = new TasksController();
