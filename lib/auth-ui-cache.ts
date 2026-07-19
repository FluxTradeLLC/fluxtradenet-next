const AUTH_UI_KEY = "fluxtrade-auth-ui";

export const AUTH_UI_CHANGED_EVENT = "fluxtrade:auth-ui-changed";

export function getCachedAuthUi() {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(AUTH_UI_KEY) === "1";
}

export function setCachedAuthUi(authenticated: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(AUTH_UI_KEY, authenticated ? "1" : "0");
}

export function clearCachedAuthUi() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(AUTH_UI_KEY);
}

export function emitAuthUiChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(AUTH_UI_CHANGED_EVENT));
}

export function subscribeAuthUi(onStoreChange: () => void) {
  window.addEventListener(AUTH_UI_CHANGED_EVENT, onStoreChange);
  return () => window.removeEventListener(AUTH_UI_CHANGED_EVENT, onStoreChange);
}
