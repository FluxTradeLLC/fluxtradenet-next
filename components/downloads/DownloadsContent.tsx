"use client";

import Link from "next/link";
import { useAppAuth } from "@/hooks/useAppAuth";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import {
  contentBodyClass,
  contentCardClass,
  contentLinkClass,
  contentSectionHeading,
  contentSubheading,
} from "@/lib/content-ui";
import { STRATEGY_DOWNLOADS, TEMPLATES_DOWNLOAD_URL } from "@/lib/downloads";

function DownloadButton({
  downloadUrl,
  label = "Download zip",
}: {
  downloadUrl: string | null;
  label?: string;
}) {
  if (downloadUrl) {
    return (
      <a
        href={downloadUrl}
        download
        className="btn-primary mt-6 w-full py-2.5 text-sm"
      >
        {label}
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
  const { isAuthenticated } = useAppAuth();
  const indicatorPackHref = isAuthenticated
    ? "/downloads/indicators"
    : "/downloads/indicator-pack";
  const subscriberSignInPrompt = !isAuthenticated ? (
    <p className={`${contentBodyClass} mt-2`}>
      Already subscribed?{" "}
      <Link href="/signin" className={contentLinkClass}>
        Sign in
      </Link>{" "}
      to download.
    </p>
  ) : null;

  return (
    <ContentPageLayout
      label="Downloads"
      title="Strategy & indicator downloads"
      description="Download strategy packages, chart templates, and our free indicator pack for NinjaTrader."
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
            href={indicatorPackHref}
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
        {subscriberSignInPrompt}

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

      <div className="mt-10">
        <h2 className={contentSubheading}>Templates download</h2>
        <p className={`${contentBodyClass} mt-2`}>
          Pre-configured NinjaTrader chart templates for FluxTrade strategies. Available to
          active subscribers —{" "}
          <Link href="/pricing" className={contentLinkClass}>
            view pricing
          </Link>
          .
        </p>
        {subscriberSignInPrompt}

        <div className="mt-8 max-w-sm">
          <div className={`${contentCardClass} flex flex-col items-center text-center`}>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-flux-green-icon/30 bg-black p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-8 w-8 text-flux-green-icon"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">Chart Templates</h3>
            <p className="mt-1 text-sm text-muted">NinjaTrader backup (.nt8backup)</p>
            <DownloadButton
              downloadUrl={TEMPLATES_DOWNLOAD_URL}
              label="Download templates"
            />
          </div>
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
              <Link href={indicatorPackHref} className={contentLinkClass}>
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
          <p className={`${contentBodyClass} mt-4`}>
            <strong className="text-white">Installing an update:</strong> You will have to
            uninstall the old version of the strategy first via{" "}
            <strong className="text-white">Tools &gt; Remove NinjaScript Assembly</strong>,
            restart NinjaTrader, and then install the new version — or uninstall, install
            the new version, and then restart.
          </p>
          <p className={`${contentBodyClass} mt-4`}>
            To pick up new features for a strategy that is already on a chart, open the{" "}
            <strong className="text-white">Strategies</strong> tab, right-click the strategy
            instance, click <strong className="text-white">Edit Strategy</strong>, then click{" "}
            <strong className="text-white">OK</strong>. This replaces the old code with a copy
            of the updated strategy.
          </p>
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

      <div className="mt-16 space-y-10">
        <h2 className={contentSectionHeading}>Troubleshooting</h2>

        <section>
          <h3 className={contentSubheading}>
            &ldquo;The NinjaScript Archive File may contain duplicate method names that
            already exist on your PC&hellip;&rdquo;
          </h3>
          <p className={`${contentBodyClass} mt-4`}>
            If you get this error, you will need to uninstall the original indicator or
            strategy file whose name is being duplicated. Go into the{" "}
            <strong className="text-white">Control Center &gt; Log</strong> tab and look
            for the yellow message. It should tell you{" "}
            <strong className="text-white">
              Type &lsquo;Indicator&rsquo; already defines a member called &lt;class
              name&gt;
            </strong>{" "}
            or{" "}
            <strong className="text-white">
              Type &lsquo;Strategy&rsquo; already defines a member called &lt;class
              name&gt;
            </strong>
            .
          </p>
          <ol className="ml-4 mt-4 list-inside list-decimal space-y-2 text-muted">
            <li>
              <strong className="text-white">New &gt; NinjaScript Editor</strong>
            </li>
            <li>
              On the right side, open{" "}
              <strong className="text-white">Indicators</strong> or{" "}
              <strong className="text-white">Strategies</strong> depending on which folder
              the duplicated name is in
            </li>
            <li>
              Right-click the duplicated one &gt;{" "}
              <strong className="text-white">Remove</strong>
            </li>
            <li>
              In the big blank area, right-click &gt;{" "}
              <strong className="text-white">Compile</strong>
            </li>
            <li>Then attempt to install the package again</li>
          </ol>
          <p className={`${contentBodyClass} mt-4`}>
            If this doesn&apos;t fix the issue, you can alternatively try a fresh
            installation of NinjaTrader.
          </p>
        </section>

        <section>
          <h3 className={contentSubheading}>
            Strategy package installed but the strategy doesn&apos;t make any trades
          </h3>
          <p className={`${contentBodyClass} mt-4`}>
            Uninstall and reinstall the strategy package, then re-import the templates
            file and try running the analyzer again:
          </p>
          <ol className="ml-4 mt-4 list-inside list-decimal space-y-2 text-muted">
            <li>
              Uninstall via{" "}
              <strong className="text-white">Tools &gt; Remove NinjaScript Assembly</strong>
            </li>
            <li>
              Re-install via{" "}
              <strong className="text-white">Tools &gt; Import &gt; NinjaScript Add-On</strong>
            </li>
            <li>
              Re-import the templates file via{" "}
              <strong className="text-white">Tools &gt; Import &gt; Backup File</strong>
            </li>
            <li>Try to run the analyzer again</li>
          </ol>
        </section>
      </div>
    </ContentPageLayout>
  );
}
