"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { setUserEmail } from "@/lib/auth-cookies";
import { setCachedAuthUi, emitAuthUiChanged } from "@/lib/auth-ui-cache";
import { setAuthToken, startAuthSession } from "@/lib/auth-session";
import { getClerkOAuthRedirectUrls } from "@/lib/clerk-redirect";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import {
  AuthCard,
  AuthDivider,
  AuthError,
  TermsLinks,
  authInputClassName,
  authInputErrorClassName,
} from "@/components/auth/auth-ui";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const termsRequiredTooltipMessage =
  "Please agree to the Terms and Conditions to continue";

function TermsRequiredTooltip({ id }: { id: string }) {
  return (
    <span
      id={id}
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
    >
      {termsRequiredTooltipMessage}
    </span>
  );
}

export function SignUpForm() {
  const { signIn } = useSignIn();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (emailValue: string) => {
    if (!emailValue) {
      setEmailError("");
      return false;
    }

    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);

    try {
      await apiFetch("/users/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          firstname: firstName.trim(),
          lastname: lastName.trim(),
        }),
      });

      setUserEmail(email);
      startAuthSession();
      setCachedAuthUi(true);
      emitAuthUiChanged();

      const loginData = await apiFetch<{ token?: string }>("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (loginData.token) {
        setAuthToken(loginData.token);
      }

      window.location.href = "/account";
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Registration failed");
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
    <AuthCard title="Sign Up">
      {error ? <AuthError message={error} /> : null}
      <form onSubmit={handleSubmit} aria-label="Sign up form">
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-first-name" className="sr-only">
              First name
            </label>
            <input
              id="signup-first-name"
              type="text"
              placeholder="First name"
              className={authInputClassName}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              aria-required="true"
              autoComplete="given-name"
            />
          </div>
          <div>
            <label htmlFor="signup-last-name" className="sr-only">
              Last name
            </label>
            <input
              id="signup-last-name"
              type="text"
              placeholder="Last name"
              className={authInputClassName}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
              aria-required="true"
              autoComplete="family-name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="signup-email" className="sr-only">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="Email"
            className={emailError ? authInputErrorClassName : authInputClassName}
            value={email}
            onChange={handleEmailChange}
            required
            aria-required="true"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "signup-email-error" : undefined}
            autoComplete="email"
          />
          {emailError ? (
            <p id="signup-email-error" className="mt-1 text-sm text-red-400" role="alert">
              {emailError}
            </p>
          ) : null}
        </div>
        <div className="mb-6">
          <label htmlFor="signup-password" className="sr-only">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Password"
            className={authInputClassName}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            aria-required="true"
            autoComplete="new-password"
          />
        </div>
        <div className="mb-6">
          <label className="flex items-start text-sm text-muted">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-1 mr-2 h-4 w-4 rounded border-border bg-surface text-flux-green focus:ring-flux-green/50"
              aria-required="true"
              aria-describedby="terms-description"
            />
            <span id="terms-description" className="text-muted">
              I agree to the{" "}
              <a
                href="/terms"
                onClick={(event) => {
                  event.preventDefault();
                  window.open("/terms", "_blank", "noopener,noreferrer");
                }}
                className="text-flux-green underline hover:text-flux-green-dim"
                aria-label="Terms and Conditions (opens in new tab)"
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a
                href="/policies"
                onClick={(event) => {
                  event.preventDefault();
                  window.open("/policies", "_blank", "noopener,noreferrer");
                }}
                className="text-flux-green underline hover:text-flux-green-dim"
                aria-label="Refund and Cancellation Policies (opens in new tab)"
              >
                Refund and Cancellation Policies
              </a>
            </span>
          </label>
        </div>
        <div className="group relative w-full">
          <button
            type="submit"
            disabled={
              !acceptedTerms ||
              !firstName.trim() ||
              !lastName.trim() ||
              !email ||
              !password ||
              !!emailError ||
              loading
            }
            className="btn-primary w-full !rounded-xl py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Sign Up"
            aria-describedby={!acceptedTerms ? "signup-submit-tooltip" : undefined}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
          {!acceptedTerms ? <TermsRequiredTooltip id="signup-submit-tooltip" /> : null}
        </div>
      </form>
      <AuthDivider />
      <div className="group relative w-full">
        <button
          type="button"
          onClick={handleGoogleSubmit}
          disabled={!acceptedTerms || loading}
          className="flex w-full items-center justify-center rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted"
          aria-label="Continue with Google"
          aria-describedby={!acceptedTerms ? "google-signup-tooltip" : undefined}
        >
          <GoogleIcon className="mr-2 h-5 w-5" />
          Continue with Google
        </button>
        {!acceptedTerms ? <TermsRequiredTooltip id="google-signup-tooltip" /> : null}
      </div>
    </AuthCard>
  );
}
