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
const cors = require("cors");
require("dotenv").config();
const tasksRoutes = require("./routes/tasksRoute");

const app = express();
const PORT = process.env.PORT || 3500;

const corsOptions = {
  origin: "*",
  credential: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/tasks", tasksRoutes);

//TODO-API
/**
 * Create a task - POST /tasks
 * Get all tasks - GET /tasks
 * Get a task - GET /tasks/:id
 * Update a task - PUT /tasks/:id
 * Delete a task - DELETE /tasks/:id
 */

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
