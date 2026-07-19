"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import {
  contentBodyClass,
  contentCardClass,
  contentLinkClass,
  contentSubheading,
} from "@/lib/content-ui";
import { useAppAuth } from "@/hooks/useAppAuth";
import { INDICATOR_PACK_DOWNLOAD_URL } from "@/lib/downloads";
import { hasIndicatorPackAccess } from "@/lib/indicator-pack-access";

export function IndicatorsDownloadContent() {
  const router = useRouter();
  const { isLoaded, isAuthenticated } = useAppAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!hasIndicatorPackAccess() && !isAuthenticated) {
      router.replace("/downloads/indicator-pack");
      return;
    }

    setReady(true);
  }, [router, isLoaded, isAuthenticated]);

  if (!ready) {
    return (
      <ContentPageLayout
        label="Free Indicators"
        title="FluxTrade Indicators Pack"
        description="Checking access…"
      >
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-flux-green border-t-transparent" />
        </div>
      </ContentPageLayout>
    );
  }

  return (
    <ContentPageLayout
      label="Free Indicators"
      title="Your indicators pack is ready"
      description="Download the FluxTrade indicators pack for NinjaTrader."
      centered={false}
    >
      <div className={contentCardClass}>
        <h2 className={contentSubheading}>FluxTrade Indicators Pack</h2>
        <p className={`${contentBodyClass} mt-2`}>
          A full suite of professional indicators designed for serious manual and
          automated trading on NinjaTrader.
        </p>

        {INDICATOR_PACK_DOWNLOAD_URL ? (
          <a
            href={INDICATOR_PACK_DOWNLOAD_URL}
            download
            className="btn-primary mt-6 inline-flex px-8 py-3 text-sm"
          >
            Download indicators pack
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="btn-secondary mt-6 cursor-not-allowed px-8 py-3 text-sm opacity-50"
          >
            Download coming soon
          </button>
        )}

        <p className={`${contentBodyClass} mt-6 text-sm`}>
          Need help installing?{" "}
          <Link href="/support" className={contentLinkClass}>
            Contact support
          </Link>{" "}
          or join our{" "}
          <a
            href="https://discord.gg/239t9xcrxV"
            target="_blank"
            rel="noopener noreferrer"
            className={contentLinkClass}
          >
            Discord
          </a>
          .
        </p>
      </div>

      <p className={`${contentBodyClass} mt-8`}>
        <Link href="/downloads" className={contentLinkClass}>
          ← Back to all downloads
        </Link>
      </p>
    </ContentPageLayout>
  );
}
