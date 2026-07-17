"use client";

import { HandleSSOCallback } from "@clerk/react";
import { useRouter } from "next/navigation";

export function AuthCallbackContent() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <HandleSSOCallback
        navigateToApp={({ decorateUrl }) => {
          const destination = decorateUrl("/account");
          if (destination.startsWith("http")) {
            window.location.href = destination;
            return;
          }
          router.replace(destination);
        }}
        navigateToSignIn={() => router.replace("/signin")}
        navigateToSignUp={() => router.replace("/signup")}
      />
      <p className="text-muted">Completing sign in...</p>
    </div>
  );
}
