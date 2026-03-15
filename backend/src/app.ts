import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors());

import authRoutes from "./routes/auth.routes.js";
import contentRoutes from "./routes/content.routes.js";
import shareRoutes from "./routes/share.routes.js";


// Routes
app.use("/api/user", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/brain", shareRoutes);

export default app;