import { Router } from "express";

const router = Router();

// Mock data
let mockShapes = [
  { _id: "1", type: "rectangle", coordinates: 
    [
        [3729656.2396881324, 1877120.9039682792], 
        [3733307.205223716, 1877120.9039682792],
        [3733307.205223716, 1881429.6279158888],
        [3729656.2396881324, 1881429.6279158888],
        [3729656.2396881324, 1877120.9039682792],
    ], userId: "123" },

  { _id: "2", type: "polygon", coordinates: 
    [
        [3734214.2774064695, 1881112.1429934334], 
        [3734304.984624745, 1880000.9457648392],
        [3734894.5815435345, 1879071.168491934],
        [3735416.148048618, 1879071.168491934],
        [3735574.8856806, 1878458.8761414841],
        [3736209.8362085274, 1878028.0037467233], 
        [3736595.3418861977, 1878458.8761414841],
        [3736527.3114724914, 1880295.7531928336],
        [3735234.733612067, 1880250.3982039113],
        [3735234.733612067, 1881316.240443583],
        [3734214.2774064695, 1881112.1429934334],
    ], userId: "456" },

  { _id: "3", type: "polygon", coordinates: 
    [
        [3729996.722811056, 1873849.0322303963], 
        [3727990.5581172146, 1873824.8608360947],
        [3728812.360521921, 1872302.0629951025],
        [3730165.9174237894, 1873293.0901614625],
        [3729996.722811056, 1873849.0322303963],
    ], userId: "789" },

  { _id: "4", type: "rectangle", coordinates: 
    [
        [3725718.516174792, 1867999.5548094418], 
        [3726612.830556384, 1867999.5548094418],
        [3726612.830556384, 1869715.723804846],
        [3725718.516174792, 1869715.723804846],
        [3725718.516174792, 1867999.5548094418],
    ], userId: "012" },
];

// GET: Retrieve all shapes
router.get("/", (req, res) => {
  res.json({ success: true, shapes: mockShapes });
});

// GET: Count shapes
router.get("/count", (req, res) => {
  res.json({ success: true, count: mockShapes.length });
});

// POST: Create a new shape
router.post("/", (req, res) => {
  const { type, coordinates, userId } = req.body;

  const newShape = {
    _id: (mockShapes.length + 1).toString(),
    type,
    coordinates,
    userId,
  };

  mockShapes.push(newShape);
  res.status(201).json({ success: true, shape: newShape });
});

// PUT: Update a shape
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { coordinates } = req.body;

  const shape = mockShapes.find((s) => s._id === id);
  if (!shape) {
    return res.status(404).json({ success: false, error: "Shape not found" });
  }

  shape.coordinates = coordinates;
  res.json({ success: true, shape });
});

// DELETE: Delete a shape by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = mockShapes.findIndex((s) => s._id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: "Shape not found" });
  }

  const deletedShape = mockShapes.splice(index, 1);
  res.json({ success: true, shape: deletedShape });
});

// DELETE: Delete all shapes
router.delete("/", (req, res) => {
  const deletedCount = mockShapes.length;
  mockShapes = [];
  res.json({ success: true, deletedCount });
});

export default router;