const express = require("express");

console.log("Loading GetProjs");
const { getProjects } = require("../controller/projects/GetProjs");

console.log("Loading GetProj");
const { getProject } = require("../controller/projects/GetProj");
console.log("Loading createProj");

try {
  const { createProject } = require("../controller/projects/CreateProj");
  console.log("createProj loaded");
} catch (err) {
  console.error("CREATEPROJ IMPORT FAILED:");
  console.error(err);
}

console.log("Loading UpdateProj");
const { updateProject } = require("../controller/projects/UpdateProj");
console.log("UpdateProj loaded");

console.log("Loading DeleteProj");
const { deleteProject } = require("../controller/projects/DeleteProj");

console.log("All controllers loaded");

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;