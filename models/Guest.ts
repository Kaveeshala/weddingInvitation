import mongoose, { Schema, models, model } from "mongoose";

export interface IGuest {
  name: string;
  token: string;
  partySize: number;
  inviteSent: boolean;
  rsvpStatus: "pending" | "accepted" | "declined";
  respondedGuestCount: number;
  responseMessage?: string;
  phone?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const GuestSchema = new Schema<IGuest>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    partySize: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    inviteSent: {
      type: Boolean,
      default: false,
    },
    rsvpStatus: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
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
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Guest = models.Guest || model<IGuest>("Guest", GuestSchema);

export default Guest;