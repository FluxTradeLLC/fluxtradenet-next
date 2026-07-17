"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { hasPasswordSession } from "@/lib/auth-session";

export function useAppAuth() {
  const { isLoaded, isSignedIn } = useAuth();
  const [passwordSession, setPasswordSession] = useState(false);

  useEffect(() => {
    setPasswordSession(hasPasswordSession());
  }, [isLoaded, isSignedIn]);

  return {
    isLoaded,
    isAuthenticated: Boolean(isSignedIn || passwordSession),
  };
}
