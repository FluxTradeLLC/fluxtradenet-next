import Link from "next/link";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import {
  contentBodyClass,
  contentCardClass,
  contentLinkClass,
  contentSectionHeading,
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

      <div className="mt-16 space-y-10">
        <h2 className={contentSectionHeading}>Setup instructions</h2>

        <section>
          <h3 className={contentSubheading}>
            How to get and set up your free indicators pack
          </h3>
          <ol className="ml-4 mt-4 list-inside list-decimal space-y-2 text-muted">
            <li>
              Visit the{" "}
              <Link href="/downloads/indicator-pack" className={contentLinkClass}>
                Indicator Pack page
              </Link>{" "}
              to get access to the indicators pack and download it using the link
              provided
            </li>
            <li>Open NinjaTrader</li>
            <li>
              Go to{" "}
              <strong className="text-white">Tools &gt; Import &gt; NinjaScript Add-On</strong>{" "}
              and select the ZIP file and click Import
            </li>
          </ol>
        </section>

        <section>
          <h3 className={contentSubheading}>How to get and set up a strategy file</h3>
          <ol className="ml-4 mt-4 list-inside list-decimal space-y-2 text-muted">
            <li>
              <Link href="/signin" className={contentLinkClass}>
                Sign in
              </Link>{" "}
              with the account you used to purchase the strategies
            </li>
            <li>
              Download the strategy file(s) above
            </li>
            <li>Open NinjaTrader</li>
            <li>
              Go to{" "}
              <strong className="text-white">Tools &gt; Import &gt; NinjaScript Add-On</strong>{" "}
              and select the ZIP file and click Import
            </li>
          </ol>
        </section>

        <section>
          <h3 className={contentSubheading}>How to get and set up a templates file</h3>
          <ol className="ml-4 mt-4 list-inside list-decimal space-y-2 text-muted">
            <li>
              Download the templates file above
            </li>
            <li>Open NinjaTrader</li>
            <li>
              Go to{" "}
              <strong className="text-white">Tools &gt; Import &gt; Backup File</strong>{" "}
              and select the <strong className="text-white">.nt8backup</strong> file and
              click Import
            </li>
            <li>
              NinjaTrader will automatically close, even when it imports successfully
            </li>
            <li>Re-open NinjaTrader</li>
          </ol>
        </section>
      </div>
    </ContentPageLayout>
  );
}
