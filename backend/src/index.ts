import express from 'express';
const app=express();
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT || 3000;
import connectDB  from './connectDB.js';
import authRoutes from './routes/auth.routes.js';
app.use(express.json());

app.use("/api/user",authRoutes);

connectDB(process.env.MONGO_URI!)
.then(() => {
    app.listen(PORT, () => {
        console.log(`server connected to ${PORT}`); 
    });
})
.catch((err) => {
    console.error(err);
});