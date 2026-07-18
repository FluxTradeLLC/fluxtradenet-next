"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/lib/auth-cookies";
import { hasPasswordSession, setAuthToken } from "@/lib/auth-session";

export function useProtectedApiReady() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      setReady(false);
      return;
    }

    if (!isSignedIn) {
      setReady(hasPasswordSession() && Boolean(getAuthToken()));
      return;
    }

    let cancelled = false;

    void (async () => {
      const token = await getToken();

      if (cancelled) {
        return;
      }

      if (token) {
        setAuthToken(token);
        setReady(true);
        return;
      }

      setReady(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken]);

  return ready;
}
