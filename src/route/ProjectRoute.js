const express = require("express");

const { getProjects } = require("../controller/projects/GetProjs");

const { getProject } = require("../controller/projects/GetProj");

const { createProject } = require("../controller/projects/CreateProj");

const { updateProject } = require("../controller/projects/UpdateProj");

const { deleteProject } = require("../controller/projects/DeleteProj");

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
