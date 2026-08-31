import mongoose, { Schema, models, model } from "mongoose";

const GuestSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    partySize: {
      type: Number,
      required: [true, "Party size is required"],
      min: [1, "Party size must be at least 1"],
      default: 1,
    },
    side: {
      type: String,
      enum: {
        values: ["bride", "groom", "both"],
        message: "Guest side must be bride, groom, or both",
      },
      required: [true, "Guest side is required"],
    },
    rsvpStatus: {
      type: String,
      enum: {
        values: ["default", "invited", "attending", "declined"],
        message: "Invalid RSVP status",
      },
      default: "default",
    },
    respondedGuestCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    responseMessage: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

if (models.Guest) {
  delete models.Guest;
}

const Guest = model("Guest", GuestSchema);

export default Guest;