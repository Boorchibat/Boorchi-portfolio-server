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
    origin: ["http://localhost:3000", "https://api.boorchi.com",  "https://www.boorchi.com", "https://boorchi.com", "https://www.api.boorchi.com"],
    credentials: true,
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});

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
  app.use((req, res) => {
    console.log("NO ROUTE MATCHED:", req.method, req.originalUrl);
    res.status(404).json({ message: "Not found" });
  });
  app.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT");
    res.json({ success: true });
  });
}

startServer();
