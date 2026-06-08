const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    shortDescription: { type: String, required: true },   
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true  },
    sourceCode: { type: String, required: true },
    tags: [{ type: String }],
    Type: { type: String, required: true, enum: ["Full stack", "Front end", "HTML/CSS", "Javascript", "AI"] },
  },
  { timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);