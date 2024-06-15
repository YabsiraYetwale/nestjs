import { User } from "@/models/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = cookies().get("access-token")?.value;

  if (authToken == null || authToken === "") {
    return NextResponse.redirect(new URL("/en/sign-in", request.url));
  } else {
    try {
      const user: User = jwtDecode(authToken) as User;
      if (request.nextUrl.pathname.startsWith("/en/dashboard")) {
        const roles = user.roles?.map((role:any) => role.role.name);
        if (roles?.includes("admin")) {
          return NextResponse.redirect(new URL("/en/admin", request.url));
        }
      }
      if (request.nextUrl.pathname.startsWith("/en/admin")) {
        const roles = user.roles?.map((role:any) => role.role.name);
        if (!roles?.includes("admin")) {
          return NextResponse.redirect(new URL("/en/dashboard", request.url));
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/en/sign-in", request.url));
    }
  }
}

