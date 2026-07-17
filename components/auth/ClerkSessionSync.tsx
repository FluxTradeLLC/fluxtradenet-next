"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { setUserEmail } from "@/lib/auth-cookies";
import { setAuthToken } from "@/lib/auth-session";

export function ClerkSessionSync() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }

    void (async () => {
      const token = await getToken();
      const email = user.primaryEmailAddress?.emailAddress;

      if (token) {
        setAuthToken(token);
      }

      if (email) {
        setUserEmail(email);
      }
    })();
  }, [isLoaded, isSignedIn, user, getToken]);

  return null;
}
