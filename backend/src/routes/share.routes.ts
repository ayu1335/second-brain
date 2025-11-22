import { Router } from "express";
const router=Router();
import { createShareableLink ,getShareableLink} from "../controllers/share.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.post("/share",authMiddleware,createShareableLink);
router.get("/share/:shareLink",getShareableLink);

export default router;