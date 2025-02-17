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
web.use((req, res, next) => {
  // Izinkan origin tertentu (http://localhost:5173)
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");

  // Izinkan metode HTTP tertentu
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

  // Izinkan header tertentu (misalnya, Authorization)
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Izinkan pengiriman kredensial (cookies, auth headers)
  res.header("Access-Control-Allow-Credentials", "true");

  // Tangani preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No Content
  }

  next();
});
web.use(
  cors({
    origin: ["http://localhost:5173"], // Izinkan permintaan dari origin ini
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], //
  })
);

web.use("/files", express.static(path.join(__dirname, "../../files")));
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

const server = http.createServer(web);
initSocket(server);

module.exports = server;
