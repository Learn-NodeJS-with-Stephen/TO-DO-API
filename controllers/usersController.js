const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { deleteAllCompletedTask } = require("./tasksController");

const users = [];
// name: string, email: string, password: string

/**
 * TODO: 18/01/2025
 * Hashing, encryption: their use cases, and algorithms
 * cors
 * rate limiting
 */

class UsersController {
  createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newUser = {
      id: users.length + 1,
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8),
      // completed: true,
    };

    users.push(newUser);
    //Genrate a signed jwt for the user to login
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: newUser,
    });
  }

  // Get All Task
  getAllUsers(req, res) {
    return res.status(200).json({
      success: true,
      message: "All users",
      data: users,
    });
  }

  // Get All Unfinished User
  // getAllUnfinishedUsers(req, res) {
  //   const unfinishedUsers = users.filter((user) => user.completed == false);
  //   return res.status(200).json({
  //     success: true,
  //     message: "All unfinished User",
  //     data: unfinishedUsers,
  //   });
  // }

  // Get All Completed Users
  // getAllCompletedUsers(req, res) {
  //   const completedUser = users.filter((user) => user.completed);
  //   return res.status(200).json({
  //     success: true,
  //     message: "All Completed Users",
  //     data: completedUser,
  //   });
  // }

  // Get Single User
  getSingleUser(req, res) {
    const userId = req.params.userId;
    const user = users.find((user) => user.id == userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Single User",
      data: user,
    });
  }

  // Update User
  updateUser(req, res) {
    const userId = req.params.userId;
    const user = users.find((user) => user.id == userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, email, password } = req.body;
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (password !== undefined) user.password = bcrypt.hashSync(password, 8);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  }

  // Delete All Completed User
  deleteAllCompletedUser(req, res) {
    const initialLength = users.length;
    for (let i = users.length - 1; i >= 0; i--) {
      if (users[i].completed === true) users.splice(i, 1);
    }
    const deletedCount = initialLength - users.length;

    return res.status(200).json({
      success: true,
      message: `${deletedCount} completed task(s) deleted successfully`,
      data: "",
    });
  }

  // Delete A User
  deleteUser(req, res) {
    const userId = req.params.userId;

    const user = users.find((user) => user.id == userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const userIndex = users.findIndex((user) => user.id == userId);
    users.splice(userIndex, 1);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }

  // Delete All User
  deleteAllUser(req, res) {
    const deletedCount = users.length;
    users.length = 0;

    return res.status(200).json({
      success: true,
      message: `${deletedCount} user(s) deleted successfully`,
    });
  }
}

module.exports = new UsersController();
