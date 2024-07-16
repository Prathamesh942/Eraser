import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  collaborator: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  document: {
    type: Schema.Types.ObjectId,
    ref: "Document",
  },
});

export const Project = mongoose.model("Project", ProjectSchema);
