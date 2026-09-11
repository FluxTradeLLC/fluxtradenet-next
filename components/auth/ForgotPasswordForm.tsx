"use client";

import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AuthCard,
  AuthError,
  authInputClassName,
  authInputErrorClassName,
} from "@/components/auth/auth-ui";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

type Step = "email" | "reset";

type ClerkLikeError = {
  message?: string;
  longMessage?: string;
};

function clerkErrorMessage(error: ClerkLikeError, fallback: string) {
  return error.longMessage || error.message || fallback;
}

function unexpectedErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function ForgotPasswordForm() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
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

  const sendCode = async () => {
    const { error: createError } = await signIn.create({ identifier: email });
    if (createError) {
      setError(
        clerkErrorMessage(
          createError,
          "We couldn't start a password reset for that email"
        )
      );
      return false;
    }

    const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
    if (sendError) {
      setError(
        clerkErrorMessage(sendError, "We couldn't send the reset code")
      );
      return false;
    }

    return true;
  };

  const handleSendCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);

    try {
      if (await sendCode()) {
        setStep("reset");
        setNotice(`We sent a reset code to ${email}. It expires shortly.`);
      }
    } catch (err) {
      setError(unexpectedErrorMessage(err, "We couldn't send the reset code"));
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setNotice("");
    setLoading(true);

    try {
      if (await sendCode()) {
        setNotice(`We sent a new reset code to ${email}.`);
      }
    } catch (err) {
      setError(unexpectedErrorMessage(err, "We couldn't resend the reset code"));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(
        `Your new password must be at least ${MIN_PASSWORD_LENGTH} characters`
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Those passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const { error: verifyError } =
        await signIn.resetPasswordEmailCode.verifyCode({ code: code.trim() });
      if (verifyError) {
        setError(
          clerkErrorMessage(verifyError, "That reset code isn't valid")
        );
        return;
      }

      const { error: submitError } =
        await signIn.resetPasswordEmailCode.submitPassword({
          password,
          signOutOfOtherSessions: true,
        });
      if (submitError) {
        setError(
          clerkErrorMessage(submitError, "We couldn't update your password")
        );
        return;
      }

      if (signIn.status !== "complete") {
        // Most commonly `needs_second_factor`. The password change already
        // succeeded, so send the user back to sign in to finish verifying.
        setNotice("");
        setError(
          "Your password was updated, but we need more verification to sign you in. Please sign in with your new password."
        );
        return;
      }

      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const destination = decorateUrl("/account");
          if (destination.startsWith("http")) {
            window.location.href = destination;
            return;
          }
          router.replace(destination);
        },
      });
    } catch (err) {
      setError(unexpectedErrorMessage(err, "We couldn't reset your password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Reset Password">
      {error ? <AuthError message={error} /> : null}
      {notice ? (
        <p
          className="mb-4 text-center text-sm text-muted"
          role="status"
          aria-live="polite"
        >
          {notice}
        </p>
      ) : null}

      {step === "email" ? (
        <form onSubmit={handleSendCode} aria-label="Forgot password form">
          <p className="mb-6 text-center text-sm text-muted">
            Enter the email address for your account and we&apos;ll send you a
            code to reset your password.
          </p>
          <div className="mb-6">
            <label htmlFor="forgot-email" className="sr-only">
              Email
            </label>
            <input
              id="forgot-email"
              type="email"
              placeholder="Email"
              className={
                emailError ? authInputErrorClassName : authInputClassName
              }
              value={email}
              onChange={handleEmailChange}
              required
              aria-required="true"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "forgot-email-error" : undefined}
              autoComplete="email"
            />
            {emailError ? (
              <p
                id="forgot-email-error"
                className="mt-1 text-sm text-red-400"
                role="alert"
              >
                {emailError}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={!email || !!emailError || loading}
            className="btn-primary w-full !rounded-xl py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send reset code"
          >
            {loading ? "Sending code..." : "Send Reset Code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} aria-label="Reset password form">
          <div className="mb-4">
            <label htmlFor="forgot-code" className="sr-only">
              Reset code
            </label>
            <input
              id="forgot-code"
              type="text"
              inputMode="numeric"
              placeholder="Reset code"
              className={authInputClassName}
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
              aria-required="true"
              autoComplete="one-time-code"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="forgot-password" className="sr-only">
              New password
            </label>
            <input
              id="forgot-password"
              type="password"
              placeholder="New password"
              className={authInputClassName}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              aria-required="true"
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="forgot-confirm-password" className="sr-only">
              Confirm new password
            </label>
            <input
              id="forgot-confirm-password"
              type="password"
              placeholder="Confirm new password"
              className={authInputClassName}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              aria-required="true"
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
            />
          </div>
          <button
            type="submit"
            disabled={!code || !password || !confirmPassword || loading}
            className="btn-primary w-full !rounded-xl py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Reset password"
          >
            {loading ? "Resetting password..." : "Reset Password"}
          </button>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={loading}
            className="mt-4 w-full text-center text-sm text-flux-green underline hover:text-flux-green-dim disabled:cursor-not-allowed disabled:opacity-50"
          >
            Didn&apos;t get a code? Send another
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        <Link
          href="/signin"
          className="text-flux-green underline hover:text-flux-green-dim"
        >
          Back to sign in
        </Link>
      </p>
    </AuthCard>
  );
}
