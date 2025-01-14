import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import shapeRoutesMongo from "./routes/shapeRoutesMongo"; // Import the shape routes from the mock data
import shapeRoutesMock from "./routes/shapeRoutesMock"; //Import the shape routes from database
import cors from "cors";
import authRoutes from "./utils/authRoutes";
import { generateDynamicToken } from "./utils/tokenManager";

// Load environment variables dynamically 
dotenv.config({ path: "../.env" }); 

const app = express();
const PORT = process.env.PORT || 3000;
const URL_PRODUCTION_FRONT: string = process.env.URL_PRODUCTION_FRONT || "http://localhost:5173";
const URL_PRODUCTION_BACK: string = process.env.URL_PRODUCTION_BACK || "http://localhost:3000";

console.log("PRODUCTION FRONT URL: ", URL_PRODUCTION_FRONT);
console.log("PRODUCTION BACK URL: ", URL_PRODUCTION_BACK);

const allowedOrigins = [
  "https://tiff-satellite-viewer-front.vercel.app",
  "https://tiff-satellite-viewer-back.vercel.app",
];
// Middleware CORS
/* const allowedOrigins = [URL_PRODUCTION_FRONT, URL_PRODUCTION_BACK]; */
console.log("Allowed origins: ", allowedOrigins);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
if (process.env.DATA_SOURCE !== "mock") {
  connectDB();
}
console.log("Generating dynamic token");
// Generate a dynamic token
generateDynamicToken();
console.log("Configurando middleware para /api/auth");
app.use("/api/auth", authRoutes);

// Dynamically select the shape routes based on the data source
const shapeRoutes = process.env.DATA_SOURCE === "mock" ? shapeRoutesMock : shapeRoutesMongo;

console.log("Cargando ruta /api/shapes");
// Use the selected shape routes
app.use("/api/shapes", shapeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});