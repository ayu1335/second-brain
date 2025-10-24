import express from 'express';
const app=express();
const PORT=process.env.PORT || 3000;
import connectDB  from './connectDB.js';



connectDB("mongodb+srv://ayush:ayush%401335@cluster0.xcpea.mongodb.net/course-app?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    app.listen(PORT, () => {
        console.log(`server connected to ${PORT}`);
    });
})
.catch((err) => {
    console.error(err);
});