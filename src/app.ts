import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import shapeRoutesMongo from "./routes/shapeRoutesMongo"; // Import the shape routes from the mock data
import shapeRoutesMock from "./routes/shapeRoutesMock"; //Import the shape routes from database
import cors from "cors";
import authRoutes from "./utils/authRoutes";
import { generateDynamicToken } from "./utils/tokenManager";

// Load environment variables dynamically 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL_PRODUCTION_FRONT: string = process.env.URL_PRODUCTION_FRONT || "http://localhost:5173";
const URL_PRODUCTION_BACK: string = process.env.URL_PRODUCTION_BACK || "http://localhost:3000";

// Middleware CORS
const allowedOrigins = [URL_PRODUCTION_FRONT, URL_PRODUCTION_BACK];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
if (process.env.DATA_SOURCE !== "mock") {
  connectDB();
}

// Generate a dynamic token
generateDynamicToken();

app.use("/api/auth", authRoutes);

// Dynamically select the shape routes based on the data source
const shapeRoutes = process.env.DATA_SOURCE === "mock" ? shapeRoutesMock : shapeRoutesMongo;

// Use the selected shape routes
app.use("/api/shapes", shapeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});