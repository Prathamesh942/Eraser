import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { newProject, getProject } from "../controller/project.controller.js";

const router = Router();

router.route("/:id").get(getProject);
router.route("/new").post(verifyJwt, newProject);
// router.route("/update").put(updateProject);

export default router;
