const Project = require("../../schema/Project");

const createProject = async (req, res) => {
  const {
    title,
    shortDescription,
    description,
    image,
    link,
    sourceCode,
    tags,
    Type,
  } = req.body;
  if (
    !title ||
    !shortDescription ||
    !description ||
    !image ||
    !link ||
    !sourceCode ||
    !Type
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const project = await Project.create({
      title,
      shortDescription,
      description,
      image,
      link,
      sourceCode,
      tags,
      Type
    });
    return res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ error: error.message || "Server error while creating project." });
  }
};

module.exports = { createProject };
