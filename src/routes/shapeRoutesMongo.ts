import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Shape from "../models/ShapeModel";
import { isValidCoordinates } from "../utils/validators";
import { tokenMiddleware } from "../utils/tokenMiddleware";

const router = Router();

router.use(tokenMiddleware); // Middleware to validate the token

// GET: Retrieve all shapes
router.get("/", async (req: Request, res: Response) => {
  try {
    const shapes = await Shape.find();
    res.json({success: true, shapes: shapes});
  } catch (err) {
    res.status(500).json({ success: false, error: "Error fetching shapes" });
  }
});

// GET: Count documents in the collection
router.get("/count", async (req: Request, res: Response) => {
  try {
    const count = await Shape.countDocuments(); 
    if (count === 0) {
      return res.json({ success: true, message: "No shapes found", count });
    }
    res.json({ success: true, message: "Shapes exist", count });
  } catch (err) {
    console.error("Error checking shapes count:", err);
    res.status(500).json({ success: false, error: "Error checking shapes count" });
  }
});

// POST: Create a new shape
router.post(
  "/",
  async (
    req: Request<{}, {}, { type: string; coordinates: number[][]; userId?: string }>, // Change to number[][]
    res: Response
  ) => {
    try {
      const { type, coordinates, userId } = req.body;

      if (!isValidCoordinates(coordinates)) {
        return res.status(400).json({ success: false, error: "Invalid coordinates format" });
      }

      const newShape = new Shape({ type, coordinates, userId });
      await newShape.save();

      res.status(201).json({success: true, shape: newShape});
    } catch (err) {
      console.error("Error creating shapee:", err);
      res.status(500).json({ success: false, error: "Error creating shape" });
    }
  }
);

// PUT: Update an existing shape
router.put(
  "/:id",
  async (
    req: Request<{ id: string }, {}, { coordinates: number[][] }>, 
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const { coordinates } = req.body;

      if (!isValidCoordinates(coordinates)) {
        return res.status(400).json({ success: false, error: "Invalid coordinates format" });
      }

      const updatedShape = await Shape.findByIdAndUpdate(
        id,
        { coordinates },
        { new: true, runValidators: true }
      );

      if (!updatedShape) {
        return res.status(404).json({ success: false, error: "Shape not found" });
      }

      res.json({ success: true, shape: updatedShape });
    } catch (err) {
      console.error("Error updating shape:", err);
      res.status(500).json({ success: false, error: "Error updating shape" });
    }
  }
);

// DELETE: Delete a shape by ID
router.delete<{ id: string }>("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Convert the ID to ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid ID format" });
    }

    const deletedShape = await Shape.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    if (!deletedShape) {
      return res.status(404).json({ success: false, error: "Shape not found" });
    }

    res.json({ success: true, message: "Shape deleted", shape: deletedShape });
  } catch (err) {
    res.status(500).json({ success: false, error: "Error deleting shape" });
  }
});

// DELETE: Delete all shapes
router.delete("/", async (req: Request, res: Response) => {
  try {
    const result = await Shape.deleteMany(); // Delete all shapes
    res.json({ success: true, message: "All shapes deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Error deleting all shapes:", err);
    res.status(500).json({ success: false, error: "Error deleting all shapes" });
  }
});

export default router;