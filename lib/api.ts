import { emitAuthSessionExpired, getAuthToken } from "@/lib/auth-cookies";

declare global {
  interface Window {
    Clerk?: {
      session?: {
        getToken: () => Promise<string | null>;
      } | null;
    };
  }
}

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api`;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

// Clerk session JWTs are short-lived by design (~60s) and meant to be
// re-fetched per request; Clerk's SDK caches/refreshes internally so this
// is cheap. Falls back to the cached cookie for the legacy password-session
// flow, where window.Clerk has no active session.
async function resolveAuthToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const clerkSession = window.Clerk?.session;
  if (clerkSession) {
    try {
      const freshToken = await clerkSession.getToken();
      if (freshToken) {
        return freshToken;
      }
    } catch (error) {
      console.error("Failed to refresh Clerk token:", error);
    }
  }

  return getAuthToken();
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = await resolveAuthToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = (await response.json().catch(() => ({}))) as T & {
    error?: string;
  };

  if (!response.ok) {
    const errorMessage =
      typeof data.error === "string" ? data.error : "Request failed";

    if (
      response.status === 401 &&
      !path.includes("/users/logout") &&
      !path.includes("/subscription-status") &&
      typeof window !== "undefined" &&
      !errorMessage.includes("No token provided")
    ) {
      emitAuthSessionExpired();
    }

    throw new ApiError(response.status, errorMessage);
  }

  return data;
}
