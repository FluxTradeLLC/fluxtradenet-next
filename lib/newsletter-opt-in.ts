export const NEWSLETTER_OPT_IN_SESSION_KEY = "fluxtrade-newsletter-opt-in";

export function setNewsletterOptInForOAuth(optIn: boolean): void {
  if (typeof sessionStorage === "undefined") {
    return;
  }
  sessionStorage.setItem(NEWSLETTER_OPT_IN_SESSION_KEY, optIn ? "1" : "0");
}

export function readNewsletterOptInFromSession(): boolean | null {
  if (typeof sessionStorage === "undefined") {
    return null;
  }
  const value = sessionStorage.getItem(NEWSLETTER_OPT_IN_SESSION_KEY);
  if (value === "1") {
    return true;
  }
  if (value === "0") {
    return false;
  }
  return null;
}

export function clearNewsletterOptInSession(): void {
  if (typeof sessionStorage === "undefined") {
    return;
  }
  sessionStorage.removeItem(NEWSLETTER_OPT_IN_SESSION_KEY);
}
