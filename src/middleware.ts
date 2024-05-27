import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";

  const token = request.cookies.get("token")?.value || "";
  
  let userRole = "";

  if (token) {
    try {
      const decodedToken = jwt.decode(token) as JwtPayload;
      userRole = decodedToken?.role; 
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Define path restrictions based on roles
  const rolePaths = {
    admin: [
      /^\/user-profile/,
      /^\/business-self/,
      /^\/business-team/,
      /^\/myteambusiness/
    ],
    user: [
      /^\/payout-menu/,
      /^\/client-business/
    ]
  };

  // Check if the path is restricted for admin or user
  const isAdminPath = rolePaths.admin.some(adminPath => adminPath.test(path));
  const isUserPath = rolePaths.user.some(userPath => userPath.test(path));

  // Ensure role-based access
  if (isAdminPath && userRole !== "admin") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (isUserPath && userRole !== "user") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  // Allow access if none of the above conditions match
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",  // both
    "/login",  // both
    "/profile", // both
    "/changepassword", // both
    "/daily-log", // both
    "/daily-log/:path*", // both
    "/teams",  // both
    "/client-business", // user
    "/payout-menu", // user
    "/editprofile", // both
    "/dailyevents/:path*", // both
    "/not-found", // both
    "/user-profile/:path*", // admin
    "/business-self/:path*", // admin
    "/business-team/:path*", // admin
    "/myteambusiness" // admin
  ],
};
