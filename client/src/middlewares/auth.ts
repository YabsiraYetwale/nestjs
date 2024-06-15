// import { User } from "@/models/user";
// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// function middleware(request: NextRequest) {
//   const authToken = cookies().get("access-token")?.value;

//   if (authToken == null || authToken == "") {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   } else {
//     try {
//       const user: User = jwtDecode(authToken!);
//       if (request.nextUrl.pathname.startsWith("/dashboard")) {
//         if (user.roles?.includes("admin"))
//           return NextResponse.redirect(new URL("/admin", request.url));
//       }
//       if (request.nextUrl.pathname.startsWith("/admin")) {
//         if (!user.roles?.includes("admin"))
//           return NextResponse.redirect(new URL("/dashboard", request.url));
//       }
//     } catch (error) {
//       return NextResponse.redirect(new URL("/sign-in", request.url));
//     }
//   }
// }

// export default middleware;
import { User } from "@/models/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function middleware(request: NextRequest) {
  const authToken = cookies().get("access-token")?.value;

  if (authToken == null || authToken === "") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else {
    try {
      const user: User = jwtDecode(authToken) as User; // Decode the JWT token as User type
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        const roles = user.roles?.map((role) => role.role.name);
        if (roles?.includes("admin")) {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      }
      if (request.nextUrl.pathname.startsWith("/admin")) {
        const roles = user.roles?.map((role) => role.role.name);
        if (!roles?.includes("admin")) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
}

export default middleware;
