import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import shapeRoutes from "./routes/shapeRoutes"; // Import the shape routes
import cors from "cors";
import authRoutes from "./utils/authRoutes";
import { generateDynamicToken } from "./utils/tokenManager";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
connectDB();

// Generate a dynamic token
generateDynamicToken();

app.use("/api/auth", authRoutes);
app.use("/api/shapes", shapeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});