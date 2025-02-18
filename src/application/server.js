require("dotenv").config();
require("../config/dbConnect.js");

const https = require("https");
const cors = require("cors");
const express = require("express");
const path = require("path");
const publicRouter = require("../routes/publicApi.js");
const privateRouter = require("../routes/api.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");
const { initSocket } = require("../config/socket.js");

const web = express();
const server = https.createServer(web);
initSocket(server);

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://natask.vercel.app");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
web.use("/files", express.static(path.join(__dirname, "../../files")));
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

module.exports = web;
