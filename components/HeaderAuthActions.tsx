"use client";

import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useAppAuth } from "@/hooks/useAppAuth";
import { performLogout } from "@/lib/auth-session";

type HeaderAuthActionsProps = {
  layout: "desktop" | "mobile";
  onNavigate?: () => void;
};

const ghostClassName = {
  desktop:
    "text-sm text-muted transition-colors hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  mobile:
    "text-base text-muted transition-colors hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
};

const primaryClassName = {
  desktop: "btn-primary px-5 py-2 text-sm",
  mobile: "btn-primary w-full py-3 text-center text-sm",
};

export function HeaderAuthActions({ layout, onNavigate }: HeaderAuthActionsProps) {
  const { displayAuthenticated } = useAppAuth();
  const { signOut } = useClerk();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const showAuthenticated = displayAuthenticated || isSigningOut;

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await performLogout(signOut);
    } catch {
      setIsSigningOut(false);
    }
  };

  return (
    <>
      {showAuthenticated ? (
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className={ghostClassName[layout]}
        >
          {isSigningOut ? "Signing out..." : "Sign Out"}
        </button>
      ) : (
        <Link
          href="/signin"
          className={ghostClassName[layout]}
          onClick={onNavigate}
        >
          Sign In
        </Link>
      )}
      <Link
        href={showAuthenticated ? "/account" : "/signup"}
        className={primaryClassName[layout]}
        onClick={onNavigate}
      >
        {showAuthenticated ? "Account" : "Get Started"}
      </Link>
    </>
  );
}
