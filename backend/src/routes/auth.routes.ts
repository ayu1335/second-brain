import { Router } from "express";
const router =Router();
import { signup,signin } from "../controllers/auth.controller.js";

router.post("/signup",signup);
router.post("/login", signin);

export default router;