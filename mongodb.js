console.log("=== APP FILE LOADED ===");
require("dotenv").config();

console.log("MONGODB_URL =", process.env.MONGODB_URL ? "FOUND" : "MISSING");
console.log("JWTSECRET =", process.env.JWTSECRET ? "FOUND" : "MISSING");
console.log("PORT =", process.env.PORT || "MISSING");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const auth = require("./src/route/auth");
const message = require("./src/route/MessageRoute");
const project = require("./src/route/ProjectRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://boorchi.com"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the backend server");
});

app.use("/auth", auth);
app.use("/message", message);
app.use("/project", project);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });