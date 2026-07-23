import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/models/Guest";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();
    const { rsvpStatus } = body;

    if (!["default", "invited", "attending", "declined"].includes(rsvpStatus)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid RSVP status",
        },
        { status: 400 }
      );
    }

    const updatedGuest = await Guest.findByIdAndUpdate(
      id,
      { rsvpStatus },
      { new: true, runValidators: true }
    );

    if (!updatedGuest) {
      return NextResponse.json(
        {
          success: false,
          message: "Guest not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      guest: updatedGuest,
    });
  } catch (error) {
    console.error("PATCH guest error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update guest",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    const deletedGuest = await Guest.findByIdAndDelete(id);

    if (!deletedGuest) {
      return NextResponse.json(
        {
          success: false,
          message: "Guest not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Guest deleted successfully",
    });
  } catch (error) {
    console.error("DELETE guest error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete guest",
      },
      { status: 500 }
    );
  }
}