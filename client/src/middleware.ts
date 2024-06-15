import createMiddleware from 'next-intl/middleware';

// import middleware from "./middlewares/auth";

// export default middleware;
// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };

 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'amh'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(amh|en)/:path*']
};