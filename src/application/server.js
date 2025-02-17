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
    setHeader: {
      authorization: "Bearer ",
    },
    origin: ["http://localhost:5173"], // Izinkan permintaan dari origin ini
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Izinkan metode HTTP ini,
    credentials: true,
  })
);
web.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Izinkan origin tertentu
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE"); // Izinkan metode HTTP
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Izinkan header tertentu
  res.header("Access-Control-Allow-Credentials", "true"); // Izinkan kredensial
  next();
});
web.use("/files", express.static(path.join(__dirname, "../../files")));
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

const server = http.createServer(web);
initSocket(server);

module.exports = server;
