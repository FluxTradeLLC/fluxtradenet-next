"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { setUserEmail } from "@/lib/auth-cookies";
import { startAuthSession } from "@/lib/auth-session";
import { getClerkOAuthRedirectUrls } from "@/lib/clerk-redirect";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import {
  AuthCard,
  AuthDivider,
  AuthError,
  TermsLinks,
  authInputClassName,
} from "@/components/auth/auth-ui";

type LoginResponse = {
  user?: { email?: string };
};

export function SignInForm() {
  const { signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiFetch<LoginResponse>("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setUserEmail(email);
      startAuthSession();
      window.location.href = "/account";
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const { redirectUrl, redirectCallbackUrl } = getClerkOAuthRedirectUrls();

      await signIn.sso({
        strategy: "oauth_google",
        redirectUrl,
        redirectCallbackUrl,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Google sign in failed";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Sign In">
      {error ? <AuthError message={error} /> : null}
      <form onSubmit={handleEmailSubmit} aria-label="Sign in form">
        <div className="mb-4">
          <label htmlFor="signin-email" className="sr-only">
            Email
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="Email"
            className={authInputClassName}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            aria-required="true"
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="signin-password" className="sr-only">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Password"
            className={authInputClassName}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            aria-required="true"
            autoComplete="current-password"
          />
        </div>
        <div className="mb-6">
          <TermsLinks prefix="By using this service, you agree to the" />
        </div>
        <button
          type="submit"
          disabled={!email || !password || loading}
          className="btn-primary w-full rounded-xl py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Sign In"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <AuthDivider />
      <button
        type="button"
        onClick={handleGoogleSubmit}
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Sign In with Google"
      >
        <GoogleIcon className="mr-2 h-5 w-5" />
        Sign In with Google
      </button>
    </AuthCard>
  );
}
