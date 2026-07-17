"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  setAuthToken,
  setRefreshToken,
  setUserEmail,
} from "@/lib/auth-cookies";

type TokenPayload = {
  email?: string;
};

export function AuthCallbackContent() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      router.replace("/account");
      return;
    }

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken) {
      setAuthToken(accessToken);

      try {
        const decodedToken = jwtDecode<TokenPayload>(accessToken);
        if (decodedToken.email) {
          setUserEmail(decodedToken.email);
        }
      } catch {
        // Token decode failed — redirect anyway; account page can recover.
      }
    }

    if (refreshToken) {
      setRefreshToken(refreshToken);
    }

    router.replace("/account");
  }, [router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <p className="text-muted">Loading...</p>
    </div>
  );
}
