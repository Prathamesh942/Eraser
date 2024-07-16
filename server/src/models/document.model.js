import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.model("Document", documentSchema);
