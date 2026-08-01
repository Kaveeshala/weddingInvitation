import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const AUTH_COOKIE_NAME = "admin_token";

const protectedPaths = ["/dashboard"];
const authPages = ["/login", "/signup"];

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const isAuthPage = authPages.some((path) => pathname.startsWith(path));

  if (!token) {
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  const payload = await verifyToken(token);

  if (!payload) {
    const response = isProtected
      ? NextResponse.redirect(new URL("/login", req.url))
      : NextResponse.next();

    response.cookies.set(AUTH_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  }

  if (isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};