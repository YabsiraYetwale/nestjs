import { User } from "@/models/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function middleware(request: NextRequest) {
  // const authToken = cookies().get("access-token")?.value;

  // if (authToken == null)
  //   return NextResponse.redirect(new URL("/sign-in", request.url));

  // const user: User = jwtDecode(authToken!);

  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //   if (user.role === "admin")
  //     return NextResponse.redirect(new URL("/admin", request.url));
  // }

  // if (request.nextUrl.pathname.startsWith("/admin")) {
  //   if (user.role !== "admin")
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  // }
}

export default middleware;
