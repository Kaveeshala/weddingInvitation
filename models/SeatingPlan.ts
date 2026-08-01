import mongoose, { Schema, models, model } from "mongoose";

const SeatingTableSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { _id: false }
);

const SeatingAssignmentSchema = new Schema(
  {
    guestId: {
      type: String,
      required: true,
      trim: true,
    },
    tableId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const SeatingPlanSchema = new Schema(
  {
    name: {
      type: String,
      default: "main",
      unique: true,
      trim: true,
    },
    tableCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    tables: {
      type: [SeatingTableSchema],
      default: [],
    },
    assignments: {
      type: [SeatingAssignmentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const SeatingPlan =
  models.SeatingPlan || model("SeatingPlan", SeatingPlanSchema);

export default SeatingPlan;