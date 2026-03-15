import app from "./app.js";
import { env } from "./config/env.js";
import connectDB from "./config/connectDB.js";



async function startServer() {
  try {

    await connectDB(env.MONGO_URI);

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();