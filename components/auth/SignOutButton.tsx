"use client";

import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { performLogout } from "@/lib/auth-session";

export function SignOutButton() {
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

  return (
    <div className="text-center">
      {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        className="btn-primary rounded-xl px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
}
