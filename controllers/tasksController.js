const tasks = [];
const db = require("../config/db");
// title: string, description: string, completed: boolean
class TasksController {
  // /save-task -No verbs in your endpoint name

  //Create a task
  async createTask(req, res) {
    try {
      const { title, description } = req.body;
      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Title is required",
        });
      }
      const [result] = await db.query("INSERT INTO tasks (title, description) VALUES (?, ?)", [title, description]); // SQL prepared statement
      const [newTask] = await db.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: newTask,
      });
    } catch (err) {
        res.status(500).json({ error: "Error creating task", details: err.message });
    }
    
  }

  async getAllTasks(req, res) {
    try {
      const [tasks] = await db.query("SELECT * FROM tasks");
      return res.status(200).json({
        success: true,
        message: "All Tasks",
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching tasks", details: err.message });
    }
  }

  // Get all unfinished tasks
  async getallUnfinishedTasks(req, res) {
    const [unfinishedTasks] = await db.query("SELECT * FROM tasks WHERE completed = ?", [0]);
    return res.status(200).json({
      success: true,
      message: "All Unfinished Tasks",
      data: unfinishedTasks,
    });
  }

  // Get all completed tasks
  async getAllCompletedTasks(req, res) {
    const [completedTasks] = await db.query(" SELECT * FROM tasks WHERE completed = ?", [1]);
    console.log("completedTasks", completedTasks);
    return res.status(200).json({
      success: true,
      message: "All Completed Tasks",
      data: completedTasks,
    });
  }

  //Get single task
  async getSingleTask(req, res) {
    const taskId = req.params.taskId;
    // const sql = `SELECT * FROM tasks where id = ${taskId}`; Unprepared statements vulnerable to SQL injection
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", taskId); //Prepared SQL statement
    console.log(rows);
    return res.status(200).json({
      success: true,
      message: "Single Task",
      data: rows,
    });
  }

  //Update task
  async updateTask(req, res) {
    const taskId = req.params.taskId;
    const { title, description, completed } = req.body;
    console.log(taskId);
    const [getTask] = await db.query("SELECT * FROM tasks WHERE id = ?", [taskId]);
    if(!getTask || getTask.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    // console.log( title=== undefined, description=== undefined, completed=== undefined )
    // console.log(getTask[0].id)
    // const updateTitle = (title === undefined) ? getTask[0].title : title;
    // const updateDescription = (description === undefined) ? getTask[0].description : description;
    // const updateCompleted = (completed === undefined) ? getTask[0].completed : completed;
    // console.log( updateTitle, updateDescription, updateCompleted )
    // const [updateTask] = await db.query("UPDATE tasks set title=?, description=?, completed=? WHERE id=?", [updateTitle,  updateDescription, updateCompleted, taskId]);
    const [updateTask] = await db.query("UPDATE tasks set title=?, description=?, completed=? WHERE id=?", [title || getTask[0].title, description || getTask[0].description, completed || getTask[0].completed, taskId]);
    const [updatedTask] = await db.query("SELECT * FROM tasks WHERE id = ?", [taskId]);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  }

  // Delete all completed tasks
  async deleteAllCompletedTask(req, res) {
    const [deleteTask] = await db.query("DELETE FROM tasks WHERE completed = ?", [1]);
    console.log(deleteTask);
    const deletedCount = deleteTask.affectedRows;
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

  //TODO: Assingment: Put everything in try catch block just like the create task fuinction and then integrate it with the frontend
  //TODO: Assingment: Add an env.example with all the details for DB connection
  //TODO: Assingment: Properly document your APIs and add steps on how to run the app into your README file



}

module.exports = new TasksController();
