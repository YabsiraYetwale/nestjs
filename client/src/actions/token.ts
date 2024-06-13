"use server";

import { cookies } from "next/headers";
import { setCookie, deleteCookie } from "cookies-next";

export async function storeToken(token: string) {
  setCookie("access-token", token, { cookies });
}

export async function removeToken() {
  deleteCookie("access-token", { cookies });
}
