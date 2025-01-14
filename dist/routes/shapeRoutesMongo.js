"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const ShapeModel_1 = __importDefault(require("../models/ShapeModel"));
const validators_1 = require("../utils/validators");
const tokenMiddleware_1 = require("../utils/tokenMiddleware");
const router = (0, express_1.Router)();
router.use(tokenMiddleware_1.tokenMiddleware); // Middleware to validate the token
// GET: Retrieve all shapes
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shapes = yield ShapeModel_1.default.find();
        res.json({ success: true, shapes: shapes });
    }
    catch (err) {
        res.status(500).json({ success: false, error: "Error fetching shapes" });
    }
}));
// GET: Count documents in the collection
router.get("/count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield ShapeModel_1.default.countDocuments();
        if (count === 0) {
            return res.json({ success: true, message: "No shapes found", count });
        }
        res.json({ success: true, message: "Shapes exist", count });
    }
    catch (err) {
        console.error("Error checking shapes count:", err);
        res.status(500).json({ success: false, error: "Error checking shapes count" });
    }
}));
// POST: Create a new shape
router.post("/", (req, // Change to number[][]
res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, coordinates, userId } = req.body;
        if (!(0, validators_1.isValidCoordinates)(coordinates)) {
            return res.status(400).json({ success: false, error: "Invalid coordinates format" });
        }
        const newShape = new ShapeModel_1.default({ type, coordinates, userId });
        yield newShape.save();
        res.status(201).json({ success: true, shape: newShape });
    }
    catch (err) {
        console.error("Error creating shapee:", err);
        res.status(500).json({ success: false, error: "Error creating shape" });
    }
}));
// PUT: Update an existing shape
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { coordinates } = req.body;
        if (!(0, validators_1.isValidCoordinates)(coordinates)) {
            return res.status(400).json({ success: false, error: "Invalid coordinates format" });
        }
        const updatedShape = yield ShapeModel_1.default.findByIdAndUpdate(id, { coordinates }, { new: true, runValidators: true });
        if (!updatedShape) {
            return res.status(404).json({ success: false, error: "Shape not found" });
        }
        res.json({ success: true, shape: updatedShape });
    }
    catch (err) {
        console.error("Error updating shape:", err);
        res.status(500).json({ success: false, error: "Error updating shape" });
    }
}));
// DELETE: Delete a shape by ID
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Convert the ID to ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid ID format" });
        }
        const deletedShape = yield ShapeModel_1.default.findByIdAndDelete(new mongoose_1.default.Types.ObjectId(id));
        if (!deletedShape) {
            return res.status(404).json({ success: false, error: "Shape not found" });
        }
        res.json({ success: true, message: "Shape deleted", shape: deletedShape });
    }
    catch (err) {
        res.status(500).json({ success: false, error: "Error deleting shape" });
    }
}));
// DELETE: Delete all shapes
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ShapeModel_1.default.deleteMany(); // Delete all shapes
        res.json({ success: true, message: "All shapes deleted", deletedCount: result.deletedCount });
    }
    catch (err) {
        console.error("Error deleting all shapes:", err);
        res.status(500).json({ success: false, error: "Error deleting all shapes" });
    }
}));
exports.default = router;
