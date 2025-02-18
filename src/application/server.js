require("dotenv").config();
require("../config/dbConnect.js");

const http = require("http");
const cors = require("cors");
const express = require("express");
const path = require("path");
const publicRouter = require("../routes/publicApi.js");
const privateRouter = require("../routes/api.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");
const { initSocket } = require("../config/socket.js");

const web = express();
const server = http.createServer(web);
initSocket(server);

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(
  cors({
    origin: ["http://localhost:5173", "https://natask.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type, Authorization, X-Requested-With"],
  })
);
web.use("/files", express.static(path.join(__dirname, "../../files")));

web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

module.exports = server;
