const express = require("express");
const publicRouter = new express.Router();

const authController = require("../controllers/authController.js");
publicRouter.post("/api/auth/register", authController.register);
publicRouter.post("/api/auth/login", authController.login);
publicRouter.post("/api/auth/forgot-password", authController.forgotPassword);
publicRouter.patch(
  "/api/auth/reset-password/:token",
  authController.resetPassword
);

const employeeController = require("../controllers/employeeController.js");
publicRouter.get("/api/employees/:_id", employeeController.get);
// publicRouter.get('/api/employees', employeeController.getAll)

const taskController = require("../controllers/taskController.js");
publicRouter.get("/api/tasks/:_id", taskController.get);
// publicRouter.get('/api/tasks', taskController.getAll)
publicRouter.patch("/api/tasks/:_id", taskController.update);

const subtaskController = require("../controllers/subtaskController.js");
publicRouter.get("/api/subtasks/:_id", subtaskController.get);
publicRouter.get("/api/subtasks", subtaskController.getAll);
publicRouter.patch("/api/subtasks/:_id", subtaskController.update);

module.exports = publicRouter;
