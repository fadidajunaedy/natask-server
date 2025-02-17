require("dotenv").config();
require("../config/dbConnect.js");

const { initSocket } = require("../config/socket.js");
const http = require("http");
const cors = require("cors");
const express = require("express");
const path = require("path");
const publicRouter = require("../routes/publicApi.js");
const privateRouter = require("../routes/api.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");

const web = express();
web.use(express.json());
web.use(
  cors({
    origin: ["http://localhost:5173"], // Izinkan permintaan dari origin ini
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], //
  })
);

web.use("/files", express.static(path.join(__dirname, "../../files")));
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

const server = http.createServer(web);
initSocket(server);

module.exports = server;
