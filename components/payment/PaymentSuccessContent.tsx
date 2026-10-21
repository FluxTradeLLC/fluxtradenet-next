"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { AuthError, authInputClassName } from "@/components/auth/auth-ui";
import { useProtectedApiReady } from "@/hooks/useProtectedApiReady";
import { type BillingPeriod, TRIAL, getBillingPeriodLabel } from "@/lib/pricing";

type CheckoutSummary = {
  isTrial: boolean;
  trialEndsAt: number | null;
  recurringAmountCents: number;
  currency: string;
  billingFrequency: BillingPeriod;
};

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function PaymentSuccessContent() {
  const [discordName, setDiscordName] = useState("");
  const [email, setEmail] = useState("");
  const [ntEmail, setNtEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiReady = useProtectedApiReady();
  const [checkout, setCheckout] = useState<CheckoutSummary | null>(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    if (!apiReady || !sessionId) {
      return;
    }

    let cancelled = false;

    apiFetch<CheckoutSummary>(
      `/payment/checkout-session/${encodeURIComponent(sessionId)}`,
    )
      .then((data) => {
        if (!cancelled) {
          setCheckout(data);
        }
      })
      .catch((err) => {
        console.error("Error loading checkout details:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [apiReady]);

  const trialEndsAt =
    checkout?.isTrial && checkout.trialEndsAt
      ? new Date(checkout.trialEndsAt)
      : null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiFetch("/payment/send-post-purchase-info", {
        method: "POST",
        body: JSON.stringify({
          discordName,
          email,
          ntEmail,
          firstName,
          lastName,
        }),
      });
      setSuccess(true);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Failed to submit info. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="glow-orb absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 opacity-30" />

      <div className="relative mx-auto max-w-xl px-6 text-center lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-flux-green sm:text-5xl">
          {trialEndsAt
            ? `Your ${TRIAL.DAYS}-day trial has started! 🎉`
            : "Congrats, your purchase is complete! 🎉"}
        </h1>
        {!success ? (
          <a
            href="#setup-form"
            className="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-2xl border border-amber-400/60 bg-amber-400/10 px-5 py-4 text-left transition-colors hover:bg-amber-400/15"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-lg font-bold text-black"
              aria-hidden="true"
            >
              !
            </span>
            <span>
              <span className="block text-base font-bold text-amber-300">
                Action required: fill out the form below
              </span>
              <span className="block text-sm text-white/80">
                It tells us which NinjaTrader account to license.
              </span>
            </span>
            <span className="ml-auto text-xl text-amber-300" aria-hidden="true">
              ↓
            </span>
          </a>
        ) : null}
        {trialEndsAt && checkout ? (
          <p className="mt-4 text-lg text-muted">
            Thank you for joining FluxTrade! You have full access to your strategies
            until{" "}
            <span className="font-semibold text-white">
              {trialEndsAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            . After that, you&apos;ll be billed{" "}
            <span className="font-semibold text-white">
              {formatMoney(checkout.recurringAmountCents, checkout.currency)}
              {getBillingPeriodLabel(checkout.billingFrequency)}
            </span>{" "}
            unless you cancel from your account before then. Check your email for a
            receipt and onboarding instructions.
          </p>
        ) : (
          <p className="mt-4 text-lg text-muted">
            Thank you for joining FluxTrade! Your subscription is now active and you have
            full access to all premium features. Check your email for a receipt and onboarding
            instructions. If you have any questions, our support team is here to help.
          </p>
        )}
        <p className="mt-4 text-sm text-muted">
          You can manage your account, view your subscription, and get started with our
          tools from your account dashboard.
        </p>
        <Link href="/account" className="btn-primary mt-8 inline-flex px-8 py-3 text-sm">
          Go to My Account
        </Link>

        <div
          id="setup-form"
          className={`glass-card mx-auto mt-12 max-w-md scroll-mt-28 rounded-2xl p-6 text-left shadow-lg ${
            success ? "" : "ring-2 ring-amber-400/70"
          }`}
        >
          {!success ? (
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-300">
              Action required
            </p>
          ) : null}
          <h2 className="text-2xl font-bold text-white">Get Started</h2>

          {success ? (
            <div className="mt-4 text-center text-sm text-flux-green">
              <p>
                Info submitted successfully! We&apos;ll add access for these accounts
                shortly. In the meantime, please check your email for information on how
                to download and install the Add-ons. 🚀
              </p>
              <p className="mt-6 text-muted">
                Access to NinjaTrader licenses is fully automated, and only takes a few
                minutes.
              </p>
              <p className="mt-6 text-muted">
                Join the{" "}
                <a
                  href="https://discord.gg/239t9xcrxV"
                  className="text-flux-green underline hover:text-flux-green-dim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord!
                </a>
              </p>
            </div>
          ) : (
            <>
              <p className="mt-4 text-sm text-muted">
                Please enter your Discord username (optional) and NinjaTrader Account email
                (if different from the other email) in the form
                below, and we will get you set up with your license on our end.
              </p>
              <p className="mt-4 text-sm text-muted">
                We are using NinjaTrader&apos;s new email licensing system, and no longer
                need machine ID&apos;s.
              </p>
              <p className="mt-4 text-sm text-muted">
                Granting access and adding licenses and Discord roles is all done
                automatically, so please ensure all fields are correct before submitting.
              </p>
              <p className="mt-4 text-sm text-muted">
                Need help? Email us at{" "}
                <a
                  href="mailto:grant@fluxtrade.net"
                  className="text-flux-green underline hover:text-flux-green-dim"
                >
                  grant@fluxtrade.net
                </a>
                .
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">First Name</span>
                  <input
                    type="text"
                    className={authInputClassName}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">Last Name</span>
                  <input
                    type="text"
                    className={authInputClassName}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">Purchase Email</span>
                  <input
                    type="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className={authInputClassName}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">
                    NinjaTrader Account Email (if different than purchase email)
                  </span>
                  <input
                    type="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    className={authInputClassName}
                    placeholder="your@email.com"
                    value={ntEmail}
                    onChange={(event) => setNtEmail(event.target.value)}
                  />
                </label>
                <label className="flex flex-col text-left">
                  <span className="mb-1 text-sm font-semibold text-white">
                    Discord Username (this is not an email)
                  </span>
                  <input
                    type="text"
                    className={authInputClassName}
                    placeholder="e.g. Trader"
                    value={discordName}
                    onChange={(event) => setDiscordName(event.target.value)}
                  />
                </label>

                {error ? <AuthError message={error} /> : null}

                <button
                  type="submit"
                  className="btn-primary rounded-xl py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Info"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
