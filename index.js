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
const tasksRoutes = require("./routes/tasksRoute");
const usersRoutes = require("./routes/usersRoute");
const cors  = require("cors");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cors({
  origin: "*"
}));

app.use("/tasks", tasksRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
