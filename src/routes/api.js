const express = require("express");
const upload = require("../utils/uploadFile.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const privateRouter = new express.Router();
privateRouter.use(authMiddleware);

const authController = require("../controllers/authController.js");
privateRouter.get("/api/users", authController.get);
privateRouter.patch("/api/users", authController.upload, authController.update);
privateRouter.post("/api/users/change-password", authController.changePassword);

const employeeController = require("../controllers/employeeController.js");
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
privateRouter.post("/api/tasks", taskController.create);
privateRouter.get("/api/tasks", taskController.getAll);
privateRouter.delete("/api/tasks/:_id", taskController.remove);

const subtaskController = require("../controllers/subtaskController.js");
privateRouter.post("/api/subtasks", subtaskController.create);
privateRouter.delete("/api/subtasks/:_id", subtaskController.remove);

const dashboardController = require("../controllers/dashboardController.js");
privateRouter.get("/api/dashboards", dashboardController.get);

module.exports = privateRouter;
