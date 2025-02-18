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

module.exports = publicRouter;
