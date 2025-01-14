import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(uri);
    console.log("Database connected!");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Finish the application if it can't connect
  }
};

export default connectDB;