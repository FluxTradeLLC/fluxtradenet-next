import Link from "next/link";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import {
  contentBodyClass,
  contentCardClass,
  contentLinkClass,
  contentSubheading,
} from "@/lib/content-ui";
import { STRATEGY_DOWNLOADS } from "@/lib/downloads";

function DownloadButton({ downloadUrl }: { downloadUrl: string | null }) {
  if (downloadUrl) {
    return (
      <a
        href={downloadUrl}
        download
        className="btn-primary mt-6 w-full py-2.5 text-sm"
      >
        Download zip
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      className="btn-secondary mt-6 w-full cursor-not-allowed py-2.5 text-sm opacity-50"
    >
      Coming soon
    </button>
  );
}

export function DownloadsContent() {
  return (
    <ContentPageLayout
      label="Downloads"
      title="Strategy & indicator downloads"
      description="Download strategy packages and our free indicator pack for NinjaTrader."
      centered={false}
      maxWidth="max-w-5xl"
    >
      <div className={`${contentCardClass} border-flux-green/20`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <p className="label-accent text-sm">Free</p>
            <h2 className={`${contentSubheading} mt-2`}>FluxTrade Indicators Pack</h2>
            <p className={`${contentBodyClass} mt-2 max-w-xl`}>
              Get our full suite of professional indicators for NinjaTrader — free.
              Enter your email to unlock the download.
            </p>
          </div>
          <Link
            href="/downloads/indicator-pack"
            className="btn-primary shrink-0 px-6 py-3 text-sm sm:self-center"
          >
            Get free indicators
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h2 className={contentSubheading}>Strategy downloads</h2>
        <p className={`${contentBodyClass} mt-2`}>
          Zip packages for each automated strategy. Available to active subscribers —{" "}
          <Link href="/pricing" className={contentLinkClass}>
            view pricing
          </Link>
          .
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {STRATEGY_DOWNLOADS.map((strategy) => (
            <div
              key={strategy.key}
              className={`${contentCardClass} flex flex-col items-center text-center`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-flux-green-icon/30 bg-black p-2">
                <img
                  src={strategy.icon}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {strategy.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{strategy.type}</p>
              <DownloadButton downloadUrl={strategy.downloadUrl} />
            </div>
          ))}
        </div>
      </div>
    </ContentPageLayout>
  );
}
