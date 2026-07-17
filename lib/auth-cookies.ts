import Cookies from "js-cookie";

export const USER_EMAIL_KEY = "userEmail";
export const AUTH_EXPIRES_AT_KEY = "authExpiresAt";
export const AUTH_SESSION_HOURS = 4;
export const AUTH_SESSION_MS = AUTH_SESSION_HOURS * 60 * 60 * 1000;

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

export function setAuthExpiresAt(expiresAtMs: number) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(AUTH_EXPIRES_AT_KEY, String(expiresAtMs));
}

export function getAuthExpiresAt() {
  if (typeof window === "undefined") {
    return null;
  }

  const value = localStorage.getItem(AUTH_EXPIRES_AT_KEY);
  if (!value) {
    return null;
  }

  const expiresAt = Number(value);
  return Number.isFinite(expiresAt) ? expiresAt : null;
}

export function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get("token") ?? null;
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
  localStorage.removeItem(AUTH_EXPIRES_AT_KEY);
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

export const AUTH_SESSION_EXPIRED_EVENT = "fluxtrade:auth-session-expired";

export function emitAuthSessionExpired() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(AUTH_SESSION_EXPIRED_EVENT));
}
