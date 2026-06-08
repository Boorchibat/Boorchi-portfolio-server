const Project = require("../../schema/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getProjects };
