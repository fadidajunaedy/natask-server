require("dotenv").config();
require("../config/dbConnect.js");

const express = require("express");
const path = require("path");
const cors = require("cors");
const publicRouter = require("../routes/publicApi.js");
const privateRouter = require("../routes/api.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");

const web = express();

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(
  cors({
    setHeader: {
      authorization: "Bearer ",
    },
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type, Authorization, X-Requested-With"],
  })
);
web.use("/files", express.static(path.join(__dirname, "../../files")));

web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

module.exports = web;
