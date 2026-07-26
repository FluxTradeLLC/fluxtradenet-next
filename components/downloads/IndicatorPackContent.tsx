"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import {
  contentBodyClass,
  contentCardClass,
  contentInputClass,
  contentLinkClass,
} from "@/lib/content-ui";
import { grantIndicatorPackAccess } from "@/lib/indicator-pack-access";
import { apiFetch } from "@/lib/api";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function IndicatorPackContent() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptUpdates, setAcceptUpdates] = useState(true);

  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const trimmedEmail = email.trim();
  const canSubmit =
    trimmedFirstName.length > 0 &&
    trimmedLastName.length > 0 &&
    isValidEmail(trimmedEmail) &&
    acceptUpdates;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      return;
    }

    setLoading(true);

    try {
      try {
        await apiFetch("/subscribers/add", {
            method: "POST",
            body: JSON.stringify({
              email: trimmedEmail,
              firstname: trimmedFirstName,
              lastname: trimmedLastName,
            }),
          });
        } catch {
          // Don't block download access if mailing list sync fails.
        }

      grantIndicatorPackAccess(trimmedEmail);
      router.push("/downloads/indicators");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <ContentPageLayout
      label="Free Indicators"
      title="Get the FluxTrade Indicators Pack"
      description="Enter your name and email to unlock the download. We'll keep you posted on updates and new releases."
      centered={false}
    >
      {/* <p className={contentBodyClass}>
        Already submitted?{" "}
        <Link href="/downloads/indicators" className={contentLinkClass}>
          Go to your download
        </Link>
        .
      </p> */}

      <div className={`${contentCardClass} mt-8`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error ? (
            <p className="text-center text-sm text-red-400">{error}</p>
          ) : null}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="indicator-pack-first-name" className="sr-only">
                First name
              </label>
              <input
                id="indicator-pack-first-name"
                type="text"
                placeholder="First name"
                className={contentInputClass}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="given-name"
              />
            </div>
            <div>
              <label htmlFor="indicator-pack-last-name" className="sr-only">
                Last name
              </label>
              <input
                id="indicator-pack-last-name"
                type="text"
                placeholder="Last name"
                className={contentInputClass}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete="family-name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="indicator-pack-email" className="sr-only">
              Email address
            </label>
            <input
              id="indicator-pack-email"
              type="email"
              placeholder="you@example.com"
              className={contentInputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <label className="flex items-start text-sm text-muted">
            <input
              type="checkbox"
              checked={acceptUpdates}
              onChange={(e) => setAcceptUpdates(e.target.checked)}
              className="mt-1 mr-2 h-4 w-4 rounded border-border bg-surface text-flux-green focus:ring-flux-green/50"
              aria-describedby="indicator-pack-updates-description"
            />
            <span id="indicator-pack-updates-description" className="text-muted">
              It&apos;s okay to send me occasional updates from FluxTrade.
            </span>
          </label>
          <button
            type="submit"
            disabled={loading || !canSubmit}
            className="btn-primary w-full py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Unlocking…" : "Unlock download"}
          </button>
        </form>
        <p className={`${contentBodyClass} mt-4 text-center text-xs`}>
          Unsubscribe anytime from any update email.
        </p>
      </div>
    </ContentPageLayout>
  );
}
