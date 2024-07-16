import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  newProject,
  getProject,
  getProjects,
  updateDocument,
  addCollab,
} from "../controller/project.controller.js";

const router = Router();

router.route("/").get(verifyJwt, getProjects);
router.route("/:id").get(verifyJwt, getProject);
router.route("/new").post(verifyJwt, newProject);
router.route("/update/:id").put(verifyJwt, updateDocument);
router.route("/addcollaborator/:projectId/:userId").post(verifyJwt, addCollab);

export default router;
