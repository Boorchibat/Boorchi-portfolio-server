const Project = require("../../schema/Project");
const mongoose = require("mongoose");

const updateProject = async (req, res) => {
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
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid project ID." });
  }
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title: title || project.title,
        shortDescription: shortDescription || project.shortDescription,
        description: description || project.description,
        image: image || project.image,
        link: link || project.link,
        sourceCode: sourceCode || project.sourceCode,
        Type: Type || project.Type,
      },
      {
        new: true,
      },
    );
    return res.status(200).json(updatedProject);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Server error while updating project." });
  }
};

module.exports = { updateProject };

