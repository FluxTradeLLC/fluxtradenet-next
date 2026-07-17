"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { getAuthExpiresAt, AUTH_SESSION_EXPIRED_EVENT } from "@/lib/auth-cookies";
import {
  isSessionExpired,
  performLogout,
} from "@/lib/auth-session";

export function AuthSessionMonitor() {
  const { signOut } = useClerk();

  useEffect(() => {
    const handleExpired = () => {
      void performLogout(signOut);
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleExpired);

    if (isSessionExpired()) {
      handleExpired();
      return () => {
        window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleExpired);
      };
    }

    const expiresAt = getAuthExpiresAt();
    if (!expiresAt) {
      return () => {
        window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleExpired);
      };
    }

    const timeoutMs = expiresAt - Date.now();
    const timer = window.setTimeout(handleExpired, timeoutMs);

    return () => {
      window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleExpired);
      window.clearTimeout(timer);
    };
  }, [signOut]);

  return null;
}
