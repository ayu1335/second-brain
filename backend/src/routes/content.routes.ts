import { Router } from "express";
const router=Router();
import { addContent, deleteContent, getContent } from "../controllers/content.controller.js";
import authmiddleware from "../middleware/auth.middleware.js";

router.post("/add",authmiddleware,addContent);
router.get("/get",authmiddleware,getContent);
router.delete("/delete/:id",authmiddleware,deleteContent);

export default router;