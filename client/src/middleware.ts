

import { middleware } from "./middlewares/auth";

export { middleware };
export const config = {
matcher: ["/dashboard/:path*", "/admin/:path*"],

};

