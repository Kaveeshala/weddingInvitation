import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { AUTH_COOKIE_NAME, signAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const existingAdmin = await AdminUser.findOne().lean();

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin account already exists. Please log in.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid email and password are required.",
        },
        { status: 400 }
      );
    }

    if (
      process.env.ADMIN_EMAIL &&
      email !== process.env.ADMIN_EMAIL.trim().toLowerCase()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Only the configured admin email can register.",
        },
        { status: 403 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await AdminUser.create({
      email,
      passwordHash,
      role: "admin",
    });

    const token = await signAdminToken({
      id: String(admin._id),
      email: admin.email,
      role: "admin",
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin account created successfully.",
      admin: {
        id: String(admin._id),
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create admin account.",
      },
      { status: 500 }
    );
  }
}