"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { setUserEmail } from "@/lib/auth-cookies";
import { setCachedAuthUi, emitAuthUiChanged } from "@/lib/auth-ui-cache";
import { setAuthToken } from "@/lib/auth-session";

const NEW_SIGNUP_WINDOW_MS = 5 * 60 * 1000;

function getSenderSyncKey(email: string) {
  return `fluxtrade-sender-sync:${email}`;
}

function isRecentSignup(createdAt: Date | null | undefined) {
  if (!createdAt) {
    return false;
  }

  return Date.now() - createdAt.getTime() < NEW_SIGNUP_WINDOW_MS;
}

export function ClerkSessionSync() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }

    setCachedAuthUi(true);
    emitAuthUiChanged();

    void (async () => {
      const token = await getToken();
      const email = user.primaryEmailAddress?.emailAddress;

      if (token) {
        setAuthToken(token);
      }

      if (email) {
        setUserEmail(email);
      }

      if (
        email &&
        isRecentSignup(user.createdAt) &&
        !sessionStorage.getItem(getSenderSyncKey(email))
      ) {
        sessionStorage.setItem(getSenderSyncKey(email), "1");

        apiFetch("/subscribers/add", {
          method: "POST",
          body: JSON.stringify({
            email,
            firstname: user.firstName ?? undefined,
            lastname: user.lastName ?? undefined,
          }),
        }).catch((err) => {
          console.error("Failed to sync signup to Sender:", err);
          sessionStorage.removeItem(getSenderSyncKey(email));
        });
      }
    })();
  }, [isLoaded, isSignedIn, user, getToken]);

  return null;
}
