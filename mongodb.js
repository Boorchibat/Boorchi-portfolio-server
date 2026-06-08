require("dotenv").config();

console.log("=== APP FILE LOADED ===");
console.log("MONGODB_URL =", process.env.MONGODB_URL ? "FOUND" : "MISSING");
console.log("JWTSECRET =", process.env.JWTSECRET ? "FOUND" : "MISSING");
console.log("PORT =", process.env.PORT || "MISSING");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./src/route/auth");
const message = require("./src/route/MessageRoute");
const project = require("./src/route/ProjectRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://boorchi.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/auth", auth);
app.use("/message", message);
app.use("/project", project);

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected event");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB runtime error:");
  console.error(err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

async function startServer() {
  try {
    console.log("Before MongoDB connect");
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("✅ MongoDB connection successful");

    app.listen(port, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${port}`);
    });

  } catch (err) {
    console.error("❌ Startup failed:");
    console.error(err);
    process.exit(1);
  }
}

startServer();