import middleware from "./middlewares/auth";

export default middleware;
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
