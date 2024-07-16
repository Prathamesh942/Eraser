import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";

import { getUser } from "../controller/user.controller.js";

const router = Router();

router.route("/search/:email").get(verifyJwt, getUser);

export default router;
