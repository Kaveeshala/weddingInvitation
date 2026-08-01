import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/models/Guest";
import SeatingPlan from "@/models/SeatingPlan";

export async function GET() {
  try {
    await dbConnect();

    const guests = await Guest.find().sort({ createdAt: -1 }).lean();
    const seatingPlan = await SeatingPlan.findOne({ name: "main" }).lean();

    return NextResponse.json({
      success: true,
      guests,
      seatingPlan: seatingPlan || {
        name: "main",
        tableCount: 0,
        tables: [],
        assignments: [],
      },
    });
  } catch (error) {
    console.error("GET seating error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load seating data",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { tableCount, tables, assignments } = body;

    if (!Array.isArray(tables)) {
      return NextResponse.json(
        {
          success: false,
          message: "Tables are required",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(assignments)) {
      return NextResponse.json(
        {
          success: false,
          message: "Assignments are required",
        },
        { status: 400 }
      );
    }

    const guestDocs = await Guest.find().lean();
    const guestMap = new Map(
      guestDocs.map((guest: any) => [String(guest._id), guest])
    );

    const tableMap = new Map(
      tables.map((table: any) => [table.id, table])
    );

    for (const assignment of assignments) {
      if (!guestMap.has(assignment.guestId)) {
        return NextResponse.json(
          {
            success: false,
            message: "One or more assigned guests do not exist",
          },
          { status: 400 }
        );
      }

      if (!tableMap.has(assignment.tableId)) {
        return NextResponse.json(
          {
            success: false,
            message: "One or more assigned tables do not exist",
          },
          { status: 400 }
        );
      }
    }

    for (const table of tables) {
      const assignedGuests = assignments
        .filter((item: any) => item.tableId === table.id)
        .map((item: any) => guestMap.get(item.guestId))
        .filter(Boolean);

      const usedSeats = assignedGuests.reduce(
        (sum: number, guest: any) => sum + (Number(guest.partySize) || 1),
        0
      );

      if (usedSeats > Number(table.capacity || 0)) {
        return NextResponse.json(
          {
            success: false,
            message: `${table.label} exceeds its seat capacity`,
          },
          { status: 400 }
        );
      }
    }

    const uniqueGuestIds = new Set(assignments.map((item: any) => item.guestId));
    if (uniqueGuestIds.size !== assignments.length) {
      return NextResponse.json(
        {
          success: false,
          message: "A guest cannot be assigned to multiple tables",
        },
        { status: 400 }
      );
    }

    const seatingPlan = await SeatingPlan.findOneAndUpdate(
      { name: "main" },
      {
        name: "main",
        tableCount: Number(tableCount) || 0,
        tables,
        assignments,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json({
      success: true,
      seatingPlan,
    });
  } catch (error) {
    console.error("POST seating error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save seating plan",
      },
      { status: 500 }
    );
  }
}