import mongoose, { Schema, Document } from "mongoose";

export interface IShape extends Document {
  type: "rectangle" | "polygon";
  coordinates: number[][]; // Two-dimensional coordinates for the shape
  userId?: string; // Relates the shape to a user (Only if implementing authentication)
}

const ShapeSchema: Schema = new Schema({
  type: { type: String, required: true, enum: ["rectangle", "polygon"] },
  coordinates: {
    type: [[Number]], // Two-dimensional array of numbers
    required: true,
    validate: {
      validator: function (coords: number[][]) {
        return (
          Array.isArray(coords) &&
          coords.every(
            (point) =>
              Array.isArray(point) &&
              point.length === 2 &&
              point.every((num) => typeof num === "number")
          )
        );
      },
      message: "Coordinates must be a 2D array of numbers.",
    },
  },
  userId: { type: String },
},
{ timestamps: true }
);

export default mongoose.model<IShape>("Shape", ShapeSchema);