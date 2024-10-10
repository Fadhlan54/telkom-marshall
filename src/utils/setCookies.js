"use server";

import { cookies } from "next/headers";

export const setCookies = async (key, value) => {
  const storeCookie = cookies();
  storeCookie.set(key, value, {
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });
};
