import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;
import connectDB from "./connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import contentRoutes from "./routes/content.routes.js";
import shareRoutes from "./routes/share.routes.js";
app.use(express.json());

// Routes
app.use("/api/user", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/brain", shareRoutes);

// Connect to DB and start server
connectDB(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server connected to ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
