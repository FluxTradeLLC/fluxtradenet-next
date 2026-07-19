"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useSyncExternalStore } from "react";
import {
  AUTH_SESSION_EXPIRED_EVENT,
} from "@/lib/auth-cookies";
import {
  AUTH_UI_CHANGED_EVENT,
  getCachedAuthUi,
  setCachedAuthUi,
  subscribeAuthUi,
  emitAuthUiChanged,
} from "@/lib/auth-ui-cache";
import { hasPasswordSession } from "@/lib/auth-session";

function subscribePasswordSession(onStoreChange: () => void) {
  window.addEventListener(AUTH_UI_CHANGED_EVENT, onStoreChange);
  window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, onStoreChange);
  return () => {
    window.removeEventListener(AUTH_UI_CHANGED_EVENT, onStoreChange);
    window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, onStoreChange);
  };
}

export function useAppAuth() {
  const { isLoaded, isSignedIn } = useAuth();
  const passwordSession = useSyncExternalStore(
    subscribePasswordSession,
    hasPasswordSession,
    () => false,
  );
  const cachedAuthUi = useSyncExternalStore(
    subscribeAuthUi,
    getCachedAuthUi,
    () => false,
  );

  const isAuthenticated = Boolean(isSignedIn || passwordSession);

  useEffect(() => {
    if (isLoaded) {
      setCachedAuthUi(isAuthenticated);
      emitAuthUiChanged();
    }
  }, [isLoaded, isAuthenticated]);

  const displayAuthenticated = isLoaded
    ? isAuthenticated
    : passwordSession || cachedAuthUi;

  return {
    isLoaded,
    isAuthenticated,
    displayAuthenticated,
  };
}
