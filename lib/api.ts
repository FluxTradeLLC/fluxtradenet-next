import { emitAuthSessionExpired, getAuthToken } from "@/lib/auth-cookies";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api`;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = getAuthToken();
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
