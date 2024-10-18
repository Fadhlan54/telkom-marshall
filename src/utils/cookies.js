"use server";

import { cookies } from "next/headers";

export const setCookies = async (key, value) => {
  const storeCookie = cookies();
  storeCookie.set(key, value, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
};

export const getCookies = async (key) => {
  const storeCookie = cookies();
  return storeCookie.get(key)?.value;
};

export const deleteCookies = async (key) => {
  const storeCookie = cookies();
  storeCookie.delete(key);
};
