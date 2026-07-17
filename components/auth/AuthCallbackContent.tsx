"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export function AuthCallbackContent() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/account"
        signUpFallbackRedirectUrl="/account"
      />
      <p className="text-muted">Loading...</p>
    </div>
  );
}
