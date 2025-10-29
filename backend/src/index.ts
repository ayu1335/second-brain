import express from 'express';
const app=express();
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT || 3000;
import connectDB  from './connectDB.js';
import authRoutes from './routes/auth.routes.js';
import contentRoutes from "./routes/content.routes.js";

app.use("/api/content",contentRoutes);
app.use(express.json());

app.use("/api/user",authRoutes);
app.use("/api/user/content",contentRoutes)




connectDB(process.env.MONGO_URI!)
.then(() => {
    app.listen(PORT, () => {
        console.log(`server connected to ${PORT}`); 
    });
})
.catch((err) => {
    console.error(err);
});