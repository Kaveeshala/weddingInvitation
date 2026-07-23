import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/models/Guest";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { token, attending, guests, message } = body;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Guest token is required",
        },
        { status: 400 }
      );
    }

    if (!["yes", "no"].includes(attending)) {
      return NextResponse.json(
        {
          success: false,
          message: "Attendance response is required",
        },
        { status: 400 }
      );
    }

    const guest = await Guest.findOne({ token });

    if (!guest) {
      return NextResponse.json(
        {
          success: false,
          message: "Guest not found",
        },
        { status: 404 }
      );
    }

    const isAttending = attending === "yes";

    guest.rsvpStatus = isAttending ? "attending" : "declined";
    guest.respondedGuestCount = isAttending ? Number(guests) || 1 : 0;
    guest.responseMessage = message?.trim() || "";

    await guest.save();

    return NextResponse.json({
      success: true,
      message: "RSVP submitted successfully",
      guest,
    });
  } catch (error) {
    console.error("POST RSVP error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit RSVP",
      },
      { status: 500 }
    );
  }
}