"use client";

import { useState, useSyncExternalStore } from "react";
import { useAppAuth } from "@/hooks/useAppAuth";
import { ApiError, apiFetch } from "@/lib/api";
import { AuthError } from "@/components/auth/auth-ui";
import { readWebhookTestFlag } from "@/lib/webhook-test-flag";

function subscribeFlag(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export function WebhookTestContent() {
  const enabled = useSyncExternalStore(subscribeFlag, readWebhookTestFlag, () => false);
  const { isLoaded, isAuthenticated } = useAppAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!enabled) {
    return (
      <section className="pb-24 pt-28 sm:pt-36">
        <p className="text-center text-muted">Page not found.</p>
      </section>
    );
  }

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      window.location.href = `/signin?redirect_url=${encodeURIComponent("/pricing/test")}`;
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await apiFetch<{ redirect: string }>(
        "/payment/create-checkout-session",
        {
          method: "POST",
          body: JSON.stringify({ testProduct: true, subscription: true }),
        },
      );
      window.location.href = response.redirect;
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Could not start test checkout.",
      );
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="relative mx-auto max-w-xl px-6 text-center lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">Webhook test checkout</h1>
        <p className="mt-4 text-muted">
          Buys the live test product through the normal checkout and webhook flow. It saves a
          subscription row for the signed-in account but grants no strategy licenses or Discord
          roles. Use a separate test account, then cancel and refund in Stripe afterwards.
        </p>
        <div className="mt-8">
          {error && <AuthError message={error} />}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading || !isLoaded}
            className="btn-primary rounded-lg px-8 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Starting checkout..." : "Buy test product"}
          </button>
        </div>
      </div>
    </section>
  );
}
