import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/models/Guest";
import { generateToken } from "@/lib/generateToken";

export async function GET() {
  try {
    await dbConnect();

    const guests = await Guest.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      guests,
    });
  } catch (error) {
    console.error("GET guests error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch guests",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, partySize, phone, notes } = body;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Guest name is required",
        },
        { status: 400 }
      );
    }

    let token = generateToken();

    while (await Guest.findOne({ token })) {
      token = generateToken();
    }

    const guest = await Guest.create({
      name,
      token,
      partySize: Number(partySize) || 1,
      phone: phone || "",
      notes: notes || "",
    });

    return NextResponse.json(
      {
        success: true,
        guest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST guest error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create guest",
      },
      { status: 500 }
    );
  }
}