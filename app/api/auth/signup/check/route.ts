import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";

export async function GET() {
  try {
    await dbConnect();

    const existingAdmin = await AdminUser.findOne().lean();

    return NextResponse.json({
      success: true,
      canSignup: !existingAdmin,
    });
  } catch (error) {
    console.error("Signup check error:", error);

    return NextResponse.json(
      {
        success: false,
        canSignup: false,
      },
      { status: 500 }
    );
  }
}