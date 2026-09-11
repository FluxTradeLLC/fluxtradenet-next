"use client";

import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { setUserEmail } from "@/lib/auth-cookies";
import { setCachedAuthUi, emitAuthUiChanged } from "@/lib/auth-ui-cache";
import { setAuthToken, startAuthSession } from "@/lib/auth-session";
import { getClerkOAuthRedirectUrls } from "@/lib/clerk-redirect";
import { getClerkErrorMessage } from "@/lib/clerk-errors";
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
  token?: string;
};

export function SignInForm() {
  const clerk = useClerk();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch<LoginResponse>("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setUserEmail(email);
      startAuthSession();
      setCachedAuthUi(true);
      emitAuthUiChanged();

      if (data.token) {
        setAuthToken(data.token);
      }
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
      const { ssoCallbackUrl, afterSignInUrl } = getClerkOAuthRedirectUrls();

      // authenticateWithRedirect always starts a fresh sign-in attempt, and
      // throws on failure. signIn.sso() instead reuses whatever attempt is
      // already on the client, so one left behind by the forgot-password flow
      // turned this button into a silent no-op.
      await clerk.client.signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: ssoCallbackUrl,
        redirectUrlComplete: afterSignInUrl,
      });
    } catch (err) {
      setError(getClerkErrorMessage(err, "Google sign in failed"));
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
          <p className="mt-2 text-right text-sm">
            <Link
              href="/forgot-password"
              className="text-flux-green underline hover:text-flux-green-dim"
            >
              Forgot password?
            </Link>
          </p>
        </div>
        <div className="mb-6">
          <TermsLinks prefix="By using this service, you agree to the" />
        </div>
        <button
          type="submit"
          disabled={!email || !password || loading}
          className="btn-primary w-full !rounded-xl py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Sign In"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <AuthDivider />
      <button
        type="button"
        onClick={handleGoogleSubmit}
        disabled={loading || !clerk.loaded}
        className="flex w-full items-center justify-center rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Sign In with Google"
      >
        <GoogleIcon className="mr-2 h-5 w-5" />
        Sign In with Google
      </button>
    </AuthCard>
  );
}
