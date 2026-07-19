"use client";

import { useAppAuth } from "@/hooks/useAppAuth";
import { useProtectedApiReady } from "@/hooks/useProtectedApiReady";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { getUserEmail } from "@/lib/auth-cookies";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { SignUpForm } from "@/components/auth/SignUpForm";

type Tab = "signin" | "signup";

function AccountDashboard() {
  const { user } = useUser();
  const apiReady = useProtectedApiReady();
  const [isPaid, setIsPaid] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const displayEmail =
    user?.primaryEmailAddress?.emailAddress ?? getUserEmail();

  useEffect(() => {
    if (!displayEmail || !apiReady) {
      return;
    }

    const fetchSubscriptionStatus = async () => {
      try {
        const data = await apiFetch<{ paid: boolean }>(
          `/payment/subscription-status/${encodeURIComponent(displayEmail)}`,
        );
        setIsPaid(data.paid);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    fetchSubscriptionStatus();
  }, [displayEmail, apiReady]);

  const handleCustomerPortal = async () => {
    if (!displayEmail || !isPaid) {
      return;
    }

    setPortalLoading(true);

    try {
      const data = await apiFetch<{ url: string }>("/payment/customer-portal", {
        method: "POST",
        body: JSON.stringify({ email: displayEmail }),
      });
      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating customer portal session:", error);
      setPortalLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="glow-orb absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 opacity-30" />

      <div className="relative mx-auto max-w-lg px-6 text-center lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Account
        </h1>
        {displayEmail ? (
          <p className="mt-4 text-lg text-muted">Logged in as: {displayEmail}</p>
        ) : null}

        <div className="mt-8 flex flex-col items-center gap-8">
          {!isPaid ? (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">Sign up for a plan</h2>
              <Link href="/pricing" className="btn-primary inline-flex px-6 py-2.5 text-sm">
                Select a Plan
              </Link>
            </div>
          ) : null}

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Subscription Settings</h2>
            <p className="text-sm text-muted">
              Log into the Stripe customer portal to manage your subscription, update your
              payment method, or cancel your subscription.
            </p>
            <button
              type="button"
              onClick={handleCustomerPortal}
              disabled={portalLoading || !isPaid}
              className="btn-primary rounded-xl px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Manage subscription settings in Stripe customer portal"
              aria-disabled={!isPaid}
            >
              {portalLoading ? "Opening portal..." : "Subscription Settings"}
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Downloads</h2>
            <p className="text-sm text-muted">
              Download your strategy files, chart templates, and the free indicators pack
              for NinjaTrader. Setup instructions are included on the downloads page.
            </p>
            <Link href="/downloads" className="btn-primary inline-flex px-6 py-2.5 text-sm">
              Downloads
            </Link>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Sign Out</h2>
            <SignOutButton />
          </div>
        </div>
      </div>
    </section>
  );
}

function AccountAuthForms() {
  const [activeTab, setActiveTab] = useState<Tab>("signin");

  return (
    <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="glow-orb absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 opacity-30" />

      <div className="relative mx-auto max-w-md px-6 lg:px-8">
        <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Account
        </h1>

        <div
          className="flex border-b border-border"
          role="tablist"
          aria-label="Account authentication"
        >
          <button
            type="button"
            onClick={() => setActiveTab("signin")}
            role="tab"
            aria-selected={activeTab === "signin"}
            aria-controls="signin-panel"
            className={`w-1/2 py-4 text-center text-sm font-semibold transition-colors ${
              activeTab === "signin"
                ? "border-b-2 border-flux-green text-flux-green"
                : "text-muted"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            role="tab"
            aria-selected={activeTab === "signup"}
            aria-controls="signup-panel"
            className={`w-1/2 py-4 text-center text-sm font-semibold transition-colors ${
              activeTab === "signup"
                ? "border-b-2 border-flux-green text-flux-green"
                : "text-muted"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div
          className="pt-8"
          role="tabpanel"
          id={activeTab === "signin" ? "signin-panel" : "signup-panel"}
        >
          {activeTab === "signin" ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
    </section>
  );
}

function AccountLoading() {
  return (
    <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="relative mx-auto max-w-lg px-6 text-center lg:px-8">
        <p className="text-muted">Loading account...</p>
      </div>
    </section>
  );
}

export function AccountContent() {
  const { isLoaded, isAuthenticated } = useAppAuth();

  if (!isLoaded) {
    return <AccountLoading />;
  }

  if (isAuthenticated) {
    return <AccountDashboard />;
  }

  return <AccountAuthForms />;
}
