import Cookies from "js-cookie";
import { ApiError, apiFetch } from "@/lib/api";
import {
  AUTH_EXPIRES_AT_KEY,
  AUTH_SESSION_MS,
  clearAuthCookies,
  clearUserEmail,
  getAuthExpiresAt,
  getCookieOptions,
  getUserEmail,
  setAuthExpiresAt,
} from "@/lib/auth-cookies";
import { clearCachedAuthUi, emitAuthUiChanged } from "@/lib/auth-ui-cache";

export function isSessionExpired() {
  const expiresAt = getAuthExpiresAt();
  if (!expiresAt) {
    return false;
  }

  return Date.now() >= expiresAt;
}

export function hasPasswordSession() {
  return Boolean(getUserEmail()) && !isSessionExpired();
}

export function clearAuthExpiresAt() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_EXPIRES_AT_KEY);
}

export function startAuthSession() {
  const expiresAt = Date.now() + AUTH_SESSION_MS;
  setAuthExpiresAt(expiresAt);
  return expiresAt;
}

export function setAuthToken(token: string) {
  const expiresAt = getAuthExpiresAt() ?? startAuthSession();

  Cookies.set("token", token, {
    ...getCookieOptions(),
    expires: new Date(expiresAt),
  });
}

export async function performLogout(
  signOut?: () => Promise<void> | void,
) {
  try {
    await apiFetch("/users/logout", { method: "POST" });
  } catch (error) {
    if (!(error instanceof ApiError && error.status === 401)) {
      console.error("Logout request failed:", error);
    }
  }

  try {
    await signOut?.();
  } catch (error) {
    console.error("Clerk sign out failed:", error);
  }

  clearAuthCookies();
  clearUserEmail();
  clearAuthExpiresAt();
  clearCachedAuthUi();
  emitAuthUiChanged();

  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
}
