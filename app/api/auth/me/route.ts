import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          admin: null,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Me error:", error);

    return NextResponse.json(
      {
        success: false,
        admin: null,
        message: "Failed to load admin",
      },
      { status: 500 }
    );
  }
}