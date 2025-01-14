import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import shapeRoutes from "./routes/shapeRoutes"; // Importa el archivo de rutas
import cors from "cors";
import authRoutes from "./utils/authRoutes";
import { generateDynamicToken } from "./utils/tokenManager";

// Carga variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Genera el token dinámico al iniciar
generateDynamicToken();

app.use("/api/auth", authRoutes);
app.use("/api/shapes", shapeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});