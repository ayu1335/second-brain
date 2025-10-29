import { Router } from "express";
const router=Router();
import { addContent, deleteContent, getContent } from "../controllers/content.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.post("/add",authMiddleware,addContent);
router.get("/get",authMiddleware,getContent);
router.delete("/delete/:id",authMiddleware,deleteContent);

export default router;