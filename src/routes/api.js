const express = require("express");
const upload = require("../utils/uploadFile.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);

const authController = require("../controllers/authController.js");
privateRouter.get("/api/users", authController.get);
privateRouter.patch(
  "/api/users",
  upload.single("photo"),
  authController.update
);
privateRouter.post("/api/users/change-password", authController.changePassword);

const employeeController = require("../controllers/employeeController.js");
privateRouter.get("/api/employees/:_id", employeeController.get);
privateRouter.get("/api/employees", employeeController.getAll);
privateRouter.post(
  "/api/employees",
  upload.single("photo"),
  employeeController.create
);
privateRouter.patch(
  "/api/employees/:_id",
  upload.single("photo"),
  employeeController.update
);
privateRouter.delete("/api/employees/:_id", employeeController.remove);

const taskController = require("../controllers/taskController.js");
privateRouter.get("/api/tasks/:_id", taskController.get);
privateRouter.get("/api/tasks", taskController.getAll);
privateRouter.post("/api/tasks", taskController.create);
privateRouter.patch("/api/tasks/:_id", taskController.update);
privateRouter.delete("/api/tasks/:_id", taskController.remove);

const subtaskController = require("../controllers/subtaskController.js");
privateRouter.get("/api/subtasks/:_id", subtaskController.get);
privateRouter.get("/api/subtasks", subtaskController.getAll);
privateRouter.post("/api/subtasks", subtaskController.create);
privateRouter.patch("/api/subtasks/:_id", subtaskController.update);
privateRouter.delete("/api/subtasks/:_id", subtaskController.remove);

const dashboardController = require("../controllers/dashboardController.js");
privateRouter.get("/api/dashboards", dashboardController.get);

module.exports = privateRouter;
