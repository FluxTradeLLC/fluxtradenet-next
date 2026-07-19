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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function IndicatorPackContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // TODO: wire up email capture API when ready
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
      description="Enter your email to unlock the download. We'll keep you posted on updates and new releases."
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
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Unlocking…" : "Unlock download"}
          </button>
        </form>
        <p className={`${contentBodyClass} mt-4 text-center text-xs`}>
          By submitting, you agree to receive occasional product updates from FluxTrade.
          Unsubscribe anytime.
        </p>
      </div>
    </ContentPageLayout>
  );
}
