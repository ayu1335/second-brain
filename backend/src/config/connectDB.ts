import mongoose from "mongoose";
export default async function connectDB(url: string) {
    await mongoose.connect(url);
}
