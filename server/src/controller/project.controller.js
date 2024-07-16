import { Document } from "../models/document.model.js";
import { Project } from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const newProject = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.create({ owner: user._id });
    if (!project) {
      throw new ApiError(401, "Error occured while creating project");
    }
    const document = await Document.create({
      project: project._id,
      title: "",
      content: "",
    });
    project.document = document._id;
    await project.save();
    return res
      .status(200)
      .json(new ApiResponse(200, project, "Project created"));
  } catch (error) {
    throw new ApiError(401, "Error occured while creating project");
  }
});

const getProject = asyncHandler(async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log(projectId);
    const project = await Project.findById(projectId).populate("document");
    if (!project) {
      throw new ApiError(401, "Error occured while fetching project");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, project, "Project fetched"));
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export { newProject, getProject };
