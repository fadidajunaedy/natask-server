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

const taskController = require("../controllers/taskController.js");
publicRouter.get("/api/public/tasks/:_id", taskController.get);

const subtaskController = require("../controllers/subtaskController.js");
publicRouter.get("/api/public/subtasks/:_id", subtaskController.get);
publicRouter.get("/api/public/subtasks", subtaskController.getAll);
publicRouter.patch("/api/public/subtasks/:_id", subtaskController.update);

module.exports = publicRouter;
