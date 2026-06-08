const Project = require("../../schema/Project");
const mongoose = require("mongoose");

const deleteProject = async (req, res) => {
  const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid project ID." });
    }
    try{
        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({ error: "Project not found." });
        }
        await Project.findByIdAndDelete(id);
        return res.status(200).json({ message: "Project deleted successfully." });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ error: "Server error while deleting project." });
    }
};

module.exports = { deleteProject };