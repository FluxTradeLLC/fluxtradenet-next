import Cookies from "js-cookie";

export const USER_EMAIL_KEY = "userEmail";

export function getCookieOptions() {
  return {
    path: "/",
    sameSite: "Lax" as const,
    secure: process.env.NODE_ENV === "production",
    ...(process.env.NODE_ENV === "production"
      ? { domain: ".fluxtrade.net" }
      : {}),
  };
}

export function setAuthToken(token: string, expiresDays = 7) {
  Cookies.set("token", token, {
    ...getCookieOptions(),
    expires: expiresDays,
  });
}

export function setRefreshToken(refreshToken: string) {
  Cookies.set("refresh_token", refreshToken, getCookieOptions());
}

export function clearAuthCookies() {
  const domainOptions =
    process.env.NODE_ENV === "production"
      ? { domain: ".fluxtrade.net", path: "/" }
      : { path: "/" };
  const hostOnlyOptions = { path: "/" };

  Cookies.remove("token", domainOptions);
  Cookies.remove("refresh_token", domainOptions);
  Cookies.remove("token", hostOnlyOptions);
  Cookies.remove("refresh_token", hostOnlyOptions);
}

export function setUserEmail(email: string) {
  localStorage.setItem(USER_EMAIL_KEY, email);
}

export function getUserEmail() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(USER_EMAIL_KEY);
}

export function clearUserEmail() {
  localStorage.removeItem(USER_EMAIL_KEY);
}
