

import { middleware } from "./middlewares/auth";
import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['en', 'amh'],
 
//   // Used when no locale matches
//   defaultLocale: 'en'
// });
 
// export const config = {
//   // Match only internationalized pathnames 
// matcher: ["/(amh|en)/dashboard/:path*", "/(amh|en)/admin/:path*"],

// };

// export { middleware };
 
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