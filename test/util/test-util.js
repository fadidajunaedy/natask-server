const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database Connected");
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log("Database Disconnected");
});
