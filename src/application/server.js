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

web.use(
  cors({
    origin: ["http://localhost:3000", "https://natask.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
web.get("/", (req, res) => {
  res.send("CORS sudah diatur!");
});
web.use(express.json());
web.use("/files", express.static(path.join(__dirname, "../../files")));
web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

module.exports = web;
