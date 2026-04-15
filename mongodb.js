const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const auth = require("./src/route/auth");
const message = require("./src/route/MessageRoute");

const app = express();
const port = process.env.PORT || 9000;

app.use(
  cors({
    origin: [
      "http://localhost:9000",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", async (request, response) => {
  response.send("This is the lost and found backend server");
});

app.use("/auth", auth);
app.use("/message", message);


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB succesfully!");
    app.listen(port, () => {
      console.log(`✅server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("❌Error connecting to MongoDB", error);
  });
