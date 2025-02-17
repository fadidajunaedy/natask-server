const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const DB = mongoose.connection;

DB.on("error", (error) => console.log(error));
DB.once("connected", () => console.log("Database Connected"));
