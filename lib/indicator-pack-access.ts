const ACCESS_KEY = "fluxtrade-indicator-pack-access";
const EMAIL_KEY = "fluxtrade-indicator-pack-email";

export function hasIndicatorPackAccess(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(ACCESS_KEY) === "true";
}

export function grantIndicatorPackAccess(email: string): void {
  sessionStorage.setItem(ACCESS_KEY, "true");
  sessionStorage.setItem(EMAIL_KEY, email);
}

export function getIndicatorPackEmail(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return sessionStorage.getItem(EMAIL_KEY);
}
