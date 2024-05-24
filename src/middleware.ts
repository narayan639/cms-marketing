import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicpath = path === "/login";

  const token = request.cookies.get("token")?.value || "";
  


  if (isPublicpath && token) {
      return NextResponse.redirect(new URL("/", request.url));
   
  }

  if (!isPublicpath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/profile",
    "/changepassword",
    "/daily-log",
    "/teams",
    "/business",
    "/payout-menu",
    "/settings",
    "/editprofile",
    "/dailyevents"
  ],
};
