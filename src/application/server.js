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

web.use(
  cors({
    origin: ["http://localhost:5173"], // Izinkan permintaan dari origin ini
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Izinkan metode HTTP ini
    credentials: true, // Izinkan pengiriman kredensial (jika diperlukan)
  })
);
web.use(express.json());
web.use("/files", express.static(path.join(__dirname, "../../files")));
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

module.exports = server;
