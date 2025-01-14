"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const shapeRoutesMongo_1 = __importDefault(require("./routes/shapeRoutesMongo")); // Import the shape routes from the mock data
const shapeRoutesMock_1 = __importDefault(require("./routes/shapeRoutesMock")); //Import the shape routes from database
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./utils/authRoutes"));
const tokenManager_1 = require("./utils/tokenManager");
// Load environment variables dynamically 
dotenv_1.default.config({ path: "../.env" });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const URL_PRODUCTION_FRONT = process.env.URL_PRODUCTION_FRONT || "http://localhost:5173";
const URL_PRODUCTION_BACK = process.env.URL_PRODUCTION_BACK || "http://localhost:3000";
console.log("PRODUCTION FRONT URL: ", URL_PRODUCTION_FRONT);
console.log("PRODUCTION BACK URL: ", URL_PRODUCTION_BACK);
const allowedOrigins = [
    "https://tiff-satellite-viewer-front.vercel.app",
    "https://tiff-satellite-viewer-back.vercel.app",
];
// Middleware CORS
/* const allowedOrigins = [URL_PRODUCTION_FRONT, URL_PRODUCTION_BACK]; */
console.log("Allowed origins: ", allowedOrigins);
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Connect to the database
if (process.env.DATA_SOURCE !== "mock") {
    (0, database_1.default)();
}
console.log("Generating dynamic token");
// Generate a dynamic token
(0, tokenManager_1.generateDynamicToken)();

app.use("/api/auth", authRoutes_1.default);
// Dynamically select the shape routes based on the data source
const shapeRoutes = process.env.DATA_SOURCE === "mock" ? shapeRoutesMock_1.default : shapeRoutesMongo_1.default;
console.log("Cargando ruta /api/shapes");
// Use the selected shape routes
app.use("/api/shapes", shapeRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the Backend API!");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
