"use client";

import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { performLogout } from "@/lib/auth-session";

type SignOutButtonProps = {
  variant?: "primary" | "ghost";
  className?: string;
};

export function SignOutButton({
  variant = "primary",
  className = "",
}: SignOutButtonProps) {
  const { signOut } = useClerk();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setError("");
    setLoading(true);

    try {
      await performLogout(signOut);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
      setLoading(false);
    }
  };

  const buttonClassName =
    variant === "ghost"
      ? `text-muted transition-colors hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`
      : `btn-primary rounded-xl px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${className}`;

  return (
    <div className={variant === "primary" ? "text-center" : "contents"}>
      {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        className={buttonClassName}
      >
        {loading ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
}
